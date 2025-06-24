#!/bin/bash

# Branch Protection Verification Script
# This script checks if branch protection rules are properly configured

echo "🛡️  Checking Branch Protection Rules for GitHub Repository"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Repository info
REPO="francoalemandi1/aerolab-new-challenge"
BRANCH="main"

echo -e "${BLUE}Repository:${NC} $REPO"
echo -e "${BLUE}Branch:${NC} $BRANCH"
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed${NC}"
    echo ""
    echo "To install GitHub CLI:"
    echo "  macOS: brew install gh"
    echo "  Linux: See https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    echo "  Windows: See https://github.com/cli/cli/releases"
    echo ""
    echo "After installation, authenticate with: gh auth login"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Not authenticated with GitHub${NC}"
    echo "Please run: gh auth login"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI is installed and authenticated${NC}"
echo ""

# Function to check if a protection rule exists
check_protection() {
    echo "🔍 Checking branch protection rules..."
    
    # Get branch protection info
    PROTECTION_INFO=$(gh api repos/$REPO/branches/$BRANCH/protection 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Branch protection rules are enabled${NC}"
        echo ""
        
        # Parse protection settings
        echo "📋 Current Protection Settings:"
        echo "--------------------------------"
        
        # Check if PR is required
        PR_REQUIRED=$(echo "$PROTECTION_INFO" | jq -r '.required_pull_request_reviews != null')
        if [ "$PR_REQUIRED" = "true" ]; then
            echo -e "${GREEN}✅ Pull Request reviews required${NC}"
            
            # Get required reviewers count
            REQUIRED_REVIEWERS=$(echo "$PROTECTION_INFO" | jq -r '.required_pull_request_reviews.required_approving_review_count // 0')
            echo -e "   📝 Required approving reviews: $REQUIRED_REVIEWERS"
            
            # Check if stale reviews are dismissed
            DISMISS_STALE=$(echo "$PROTECTION_INFO" | jq -r '.required_pull_request_reviews.dismiss_stale_reviews')
            if [ "$DISMISS_STALE" = "true" ]; then
                echo -e "${GREEN}   ✅ Dismiss stale reviews: enabled${NC}"
            else
                echo -e "${YELLOW}   ⚠️  Dismiss stale reviews: disabled${NC}"
            fi
            
            # Check if code owners are required
            REQUIRE_CODE_OWNERS=$(echo "$PROTECTION_INFO" | jq -r '.required_pull_request_reviews.require_code_owner_reviews')
            if [ "$REQUIRE_CODE_OWNERS" = "true" ]; then
                echo -e "${GREEN}   ✅ Code owner reviews: required${NC}"
            else
                echo -e "${YELLOW}   ⚠️  Code owner reviews: not required${NC}"
            fi
        else
            echo -e "${RED}❌ Pull Request reviews not required${NC}"
        fi
        
        echo ""
        
        # Check status checks
        STATUS_CHECKS=$(echo "$PROTECTION_INFO" | jq -r '.required_status_checks != null')
        if [ "$STATUS_CHECKS" = "true" ]; then
            echo -e "${GREEN}✅ Status checks required${NC}"
            
            # Get strict mode
            STRICT_MODE=$(echo "$PROTECTION_INFO" | jq -r '.required_status_checks.strict')
            if [ "$STRICT_MODE" = "true" ]; then
                echo -e "${GREEN}   ✅ Strict mode: enabled (branch must be up to date)${NC}"
            else
                echo -e "${YELLOW}   ⚠️  Strict mode: disabled${NC}"
            fi
            
            # List required checks
            echo "   📋 Required checks:"
            echo "$PROTECTION_INFO" | jq -r '.required_status_checks.contexts[]' | while read check; do
                echo -e "      - $check"
            done
        else
            echo -e "${RED}❌ Status checks not required${NC}"
        fi
        
        echo ""
        
        # Check admin enforcement
        ADMIN_ENFORCED=$(echo "$PROTECTION_INFO" | jq -r '.enforce_admins.enabled')
        if [ "$ADMIN_ENFORCED" = "true" ]; then
            echo -e "${GREEN}✅ Admin enforcement: enabled${NC}"
        else
            echo -e "${YELLOW}⚠️  Admin enforcement: disabled${NC}"
        fi
        
        # Check restrictions
        RESTRICTIONS=$(echo "$PROTECTION_INFO" | jq -r '.restrictions != null')
        if [ "$RESTRICTIONS" = "true" ]; then
            echo -e "${GREEN}✅ Push restrictions: enabled${NC}"
        else
            echo -e "${YELLOW}⚠️  Push restrictions: not configured${NC}"
        fi
        
    else
        echo -e "${RED}❌ No branch protection rules found${NC}"
        echo ""
        echo -e "${YELLOW}💡 To set up branch protection rules:${NC}"
        echo "   1. Go to: https://github.com/$REPO/settings/branches"
        echo "   2. Click 'Add rule'"
        echo "   3. Follow the guide in docs/BRANCH-PROTECTION.md"
        return 1
    fi
}

# Function to check GitHub Actions status
check_actions() {
    echo ""
    echo "🚀 Checking GitHub Actions status..."
    echo "-----------------------------------"
    
    # Get latest workflow runs
    WORKFLOW_RUNS=$(gh api repos/$REPO/actions/runs --jq '.workflow_runs[0:5] | .[] | {name: .name, status: .status, conclusion: .conclusion, created_at: .created_at}' 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$WORKFLOW_RUNS" ]; then
        echo "$WORKFLOW_RUNS" | jq -r '"\(.name): \(.status) (\(.conclusion // "running"))"' | while read line; do
            if [[ $line == *"success"* ]]; then
                echo -e "${GREEN}✅ $line${NC}"
            elif [[ $line == *"failure"* ]]; then
                echo -e "${RED}❌ $line${NC}"
            else
                echo -e "${YELLOW}⏳ $line${NC}"
            fi
        done
    else
        echo -e "${YELLOW}⚠️  No workflow runs found or unable to fetch${NC}"
    fi
}

# Function to test if direct push is blocked
test_push_protection() {
    echo ""
    echo "🧪 Testing push protection (simulation)..."
    echo "----------------------------------------"
    
    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
    
    if [ "$CURRENT_BRANCH" = "main" ]; then
        echo -e "${YELLOW}⚠️  Currently on main branch${NC}"
        echo "   Recommendation: Switch to a feature branch for development"
        echo "   Command: git checkout -b feature/branch-name"
    else
        echo -e "${GREEN}✅ Currently on branch: $CURRENT_BRANCH${NC}"
        echo "   Good practice: Working on a feature branch"
    fi
    
    # Check if there are uncommitted changes
    if ! git diff-index --quiet HEAD -- 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Uncommitted changes detected${NC}"
        echo "   Remember to commit and push through a PR workflow"
    else
        echo -e "${GREEN}✅ Working directory is clean${NC}"
    fi
}

# Main execution
echo "Starting verification checks..."
echo ""

check_protection
check_actions
test_push_protection

echo ""
echo "=================================================="
echo -e "${BLUE}📖 For detailed configuration instructions:${NC}"
echo "   docs/BRANCH-PROTECTION.md"
echo ""
echo -e "${BLUE}📖 For development workflow:${NC}"
echo "   docs/DEVELOPMENT.md"
echo ""

# Check if jq is available
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}💡 Install 'jq' for better JSON parsing:${NC}"
    echo "   macOS: brew install jq"
    echo "   Linux: sudo apt-get install jq"
    echo ""
fi

echo -e "${GREEN}🎉 Branch protection verification complete!${NC}" 