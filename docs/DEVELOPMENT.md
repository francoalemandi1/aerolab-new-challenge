# Development Guide

Este documento describe las herramientas de desarrollo y flujos de trabajo configurados en el proyecto.

## 🛠️ Herramientas de Desarrollo

### Husky Git Hooks

El proyecto utiliza **Husky** para ejecutar verificaciones automáticas antes de cada commit y push.

#### Pre-commit Hook

Se ejecuta automáticamente antes de cada commit y realiza:

- **ESLint**: Verificación y corrección automática de errores de código
- **Prettier**: Formateo automático del código
- **Type checking**: Verificación de tipos TypeScript

```bash
# El hook se ejecuta automáticamente al hacer commit
git commit -m "feat: nueva funcionalidad"
```

#### Commit Message Hook

Valida que los mensajes de commit sigan el formato de **Conventional Commits**:

```
tipo(scope): descripción
```

**Tipos permitidos:**

- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `docs`: Documentación
- `style`: Cambios de estilo (sin afectar lógica)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de rendimiento
- `ci`: Cambios en CI/CD
- `build`: Cambios en el sistema de build
- `revert`: Revertir cambios

**Ejemplos válidos:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix(ui): resolve button styling issue"
git commit -m "docs: update API documentation"
git commit -m "refactor(auth): improve login flow"
```

## 🚀 GitHub Actions Workflows

### 1. CI/CD Pipeline (`.github/workflows/ci.yml`)

Se ejecuta en:

- Push a `main` o `develop`
- Pull requests a `main` o `develop`

**Jobs:**

- **Test & Lint**: Ejecuta tests, lint, type checking y build de Storybook
- **Security**: Auditoría de seguridad y verificación de dependencias
- **Build**: Construye la aplicación para producción
- **Deploy Staging**: Despliega automáticamente rama `develop` a staging
- **Deploy Production**: Despliega automáticamente rama `main` a producción

### 2. Pull Request Checks (`.github/workflows/pr-check.yml`)

Se ejecuta en cada Pull Request y realiza:

- **Información del PR**: Muestra detalles del PR
- **Validación de commits**: Verifica formato de mensajes de commit
- **Validación de cambios**:
  - Busca `console.log` no removidos
  - Detecta comentarios TODO/FIXME
  - Ejecuta suite completa de tests
  - Verifica que el build funcione
- **Análisis de tamaño**: Analiza el tamaño del bundle

### 3. Release Workflow (`.github/workflows/release.yml`)

Se ejecuta cuando se crea un tag con formato `v*.*.*`:

- Genera changelog automático
- Crea release en GitHub
- Despliega a producción
- Notifica el éxito del release

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev                 # Servidor de desarrollo
npm run build              # Build para producción
npm run start              # Servidor de producción

# Calidad de código
npm run lint               # Ejecutar ESLint
npm run lint:fix           # Corregir errores de ESLint
npm run prettier           # Formatear código
npm run prettier:check     # Verificar formato
npm run type-check         # Verificar tipos TypeScript

# Testing
npm run test               # Ejecutar tests
npm run test:ui            # Tests con interfaz
npm run test:coverage      # Tests con cobertura

# Storybook
npm run storybook          # Servidor de Storybook
npm run build-storybook    # Build de Storybook
npm run test-storybook     # Tests de Storybook

# Husky (automático)
npm run prepare            # Configurar Husky
npm run pre-commit         # Hook de pre-commit
```

## 🔧 Configuración del Entorno

### Variables de Entorno Requeridas

Para desarrollo local, copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

**Variables necesarias:**

- `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clave anónima de Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Clave de servicio de Supabase
- `MAILGUN_API_KEY`: API key de Mailgun
- `MAILGUN_DOMAIN`: Dominio configurado en Mailgun

### Secrets de GitHub (para CI/CD)

Configure estos secrets en GitHub → Settings → Secrets:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `CODECOV_TOKEN` (opcional)

## 🚨 Resolución de Problemas

### Hook de Pre-commit Fallando

Si el hook falla, puedes:

1. Corregir los errores mostrados
2. Hacer commit nuevamente
3. Si necesitas saltar el hook (NO recomendado): `git commit --no-verify`

### Mensaje de Commit Inválido

Asegúrate de seguir el formato:

```bash
tipo(scope): descripción
```

### Tests Fallando

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar tests con cobertura
npm run test:coverage
```

### Build Fallando

```bash
# Verificar errores de tipo
npm run type-check

# Verificar errores de lint
npm run lint

# Intentar build local
npm run build
```

## 📝 Flujo de Trabajo Recomendado

1. **Crear rama desde develop/main:**

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Desarrollo con commits frecuentes:**

   ```bash
   git add .
   git commit -m "feat: add user login form"
   ```

3. **Push y crear Pull Request:**

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

4. **Review del PR:** Los checks automáticos se ejecutarán

5. **Merge:** Una vez aprobado, hacer merge a develop/main

6. **Deploy automático:** Se desplegará automáticamente según la rama

## 🏷️ Creación de Releases

Para crear un nuevo release:

```bash
# Crear y push del tag
git tag v1.0.0
git push origin v1.0.0
```

Esto activará automáticamente:

- Generación de changelog
- Creación de release en GitHub
- Deploy a producción
