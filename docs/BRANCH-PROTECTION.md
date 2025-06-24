# Branch Protection Rules

Este documento explica cómo configurar las reglas de protección de ramas en GitHub para mantener la calidad y seguridad del código.

## 🛡️ Reglas de Protección Requeridas

### Para la rama `main`:

1. **Prohibir push directo a main**
2. **Requerir Pull Request reviews**
3. **Requerir que pasen las status checks (GitHub Actions)**
4. **Requerir que la rama esté actualizada antes del merge**
5. **Incluir administradores en las restricciones**

## 📋 Configuración Paso a Paso

### 1. Acceder a Branch Protection Rules

1. Ve a tu repositorio en GitHub: `https://github.com/francoalemandi1/aerolab-new-challenge`
2. Haz clic en **Settings** (arriba a la derecha)
3. En el menú lateral izquierdo, haz clic en **Branches**
4. Haz clic en **Add rule** o **Add branch protection rule**

### 2. Configurar la Regla para `main`

#### Branch name pattern

```
main
```

#### Configuraciones a activar:

✅ **Restrict pushes that create matching branches**

- Evita que se pueda crear la rama main directamente

✅ **Require a pull request before merging**

- **Required number of reviewers**: `1` (mínimo)
- ✅ **Dismiss stale PR approvals when new commits are pushed**
- ✅ **Require review from code owners** (si tienes CODEOWNERS)

✅ **Require status checks to pass before merging**

- ✅ **Require branches to be up to date before merging**
- **Status checks que deben pasar:**
  - `Test & Lint`
  - `Security Audit`
  - `Build`
  - `PR Information`
  - `Lint Commit Messages`
  - `Validate Changes`
  - `Bundle Size Check`

✅ **Require conversation resolution before merging**

- Todos los comentarios deben estar resueltos

✅ **Require signed commits** (recomendado)

- Para mayor seguridad

✅ **Require linear history**

- Evita merge commits confusos

✅ **Include administrators**

- Incluso los admins deben seguir estas reglas

✅ **Restrict pushes that create matching branches**

- Solo usuarios/equipos específicos pueden crear la rama

### 3. Status Checks Requeridos

Asegúrate de que estos checks estén configurados como requeridos:

```
# De .github/workflows/ci.yml
✅ test (Test & Lint)
✅ security (Security Audit)
✅ build (Build)

# De .github/workflows/pr-check.yml
✅ pr-info (PR Information)
✅ lint-commit-messages (Lint Commit Messages)
✅ validate-changes (Validate Changes)
✅ size-check (Bundle Size Check)
```

## 🚨 Configuración de Emergencia

### Bypass Protection (Solo Emergencias)

Si necesitas hacer un push directo en una emergencia real:

1. Ve a **Settings** → **Branches**
2. Temporalmente desactiva **Include administrators**
3. Haz el push necesario
4. **IMPORTANTE**: Reactiva **Include administrators** inmediatamente

### Hotfix Workflow

Para correcciones urgentes, usa este flujo:

```bash
# 1. Crear rama de hotfix desde main
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix

# 2. Hacer los cambios necesarios
# ... editar archivos ...

# 3. Commit con mensaje descriptivo
git add .
git commit -m "fix: critical security vulnerability in auth"

# 4. Push y crear PR urgente
git push origin hotfix/critical-fix

# 5. Crear PR marcado como URGENT
# 6. Solicitar review expedito
# 7. Hacer merge una vez aprobado y pasados los checks
```

## 📊 Verificación de Configuración

### Script de Verificación

Puedes usar la GitHub CLI para verificar las reglas:

```bash
# Instalar GitHub CLI si no lo tienes
# En macOS: brew install gh
# Autenticar: gh auth login

# Verificar reglas de protección
gh api repos/francoalemandi1/aerolab-new-challenge/branches/main/protection
```

### Checklist de Verificación

- [ ] ✅ No se puede hacer push directo a `main`
- [ ] ✅ Se requiere PR para hacer merge
- [ ] ✅ Se requiere al menos 1 reviewer
- [ ] ✅ Se invalidan approvals con nuevos commits
- [ ] ✅ Se requiere que pasen todas las status checks
- [ ] ✅ Se requiere que la rama esté actualizada
- [ ] ✅ Se requiere resolución de conversaciones
- [ ] ✅ Los administradores están incluidos en las reglas
- [ ] ✅ Se requiere historial lineal
- [ ] ✅ Se requieren commits firmados (opcional pero recomendado)

## 🔍 Status Checks Configurados

### Checks Automáticos

Estos checks se ejecutan automáticamente en cada PR:

| Check                | Descripción               | Workflow       | Requerido |
| -------------------- | ------------------------- | -------------- | --------- |
| Test & Lint          | Tests unitarios y linting | `ci.yml`       | ✅        |
| Security Audit       | Auditoría de seguridad    | `ci.yml`       | ✅        |
| Build                | Verificación de build     | `ci.yml`       | ✅        |
| PR Information       | Info del PR               | `pr-check.yml` | ✅        |
| Lint Commit Messages | Validación de commits     | `pr-check.yml` | ✅        |
| Validate Changes     | Validaciones adicionales  | `pr-check.yml` | ✅        |
| Bundle Size Check    | Análisis de tamaño        | `pr-check.yml` | ✅        |

### Configuración en GitHub

Para que estos checks aparezcan como requeridos:

1. Haz al menos un PR que ejecute todos los workflows
2. Ve a **Settings** → **Branches** → **Edit rule** para `main`
3. En **Require status checks to pass before merging**:
   - Busca cada check en la lista
   - Marca todos como requeridos
4. Guarda los cambios

## 🚫 Acciones Bloqueadas

Con estas reglas configuradas, GitHub bloqueará automáticamente:

❌ **Push directo a main**

```bash
git push origin main
# remote: error: GH006: Protected branch update failed for refs/heads/main.
```

❌ **Merge de PR con checks fallidos**

```
Pull request cannot be merged until status checks pass
```

❌ **Merge sin reviews requeridos**

```
Pull request requires review approval
```

❌ **Merge con conversaciones no resueltas**

```
Pull request has unresolved conversations
```

## 🎯 Beneficios de esta Configuración

1. **Calidad garantizada**: Todo código pasa por review y tests
2. **Historial limpio**: No hay commits directos a main
3. **Colaboración**: Fomenta el trabajo en equipo vía PRs
4. **Seguridad**: Previene errores accidentales en producción
5. **Transparencia**: Todos los cambios son visibles y rastreables
6. **Automatización**: Los checks previenen problemas antes del merge

## 🆘 Soporte y Troubleshooting

### Error: "Required status check is expected"

Si ves este error, significa que falta configurar un status check:

1. Ve a **Settings** → **Branches** → **Edit rule**
2. Busca el check faltante en **Require status checks to pass**
3. Márcalo como requerido
4. Guarda los cambios

### Error: "Branch is not up to date"

```bash
# Actualizar la rama antes del merge
git checkout feature-branch
git rebase main  # o git merge main
git push --force-with-lease origin feature-branch
```

### Checks No Aparecen en la Lista

Si los checks no aparecen para seleccionar:

1. Haz un PR de prueba que ejecute todos los workflows
2. Una vez que se ejecuten, aparecerán en la lista de status checks
3. Edita la regla de protección y márcalos como requeridos
