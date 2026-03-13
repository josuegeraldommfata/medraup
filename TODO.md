# TODO: Correção do Erro no Hero.tsx

- [✅] 1. Editar src/components/Hero.tsx: remover import duplicado do Button + corrigir types
- [✅] 2. Testar o projeto após edição (erro SyntaxError corrigido, sem erros TS/ESLint no Hero.tsx)
- [✅] 3. Marcar como concluído

### 1. Criar estruturas base (types, context) [✅]
- [ ] src/types/site.ts
- [ ] src/contexts/SiteContext.tsx
- [ ] src/contexts/AuthContext.tsx

### 2. Criar páginas admin [✅ Estrutura básica]
- [ ] src/pages/Admin.tsx (login + protected dashboard)
- [ ] src/pages/Dashboard.tsx (tabs edição)

### 3. Criar componentes admin [✅]
- [ ] src/components/admin/Login.tsx
- [ ] src/components/admin/AdminLayout.tsx
- [ ] src/components/admin/EditHeader.tsx, EditHero.tsx, etc.

### 4. Editar componentes existentes para usar siteData [PENDENTE]
- [ ] App.tsx (rotas)
- [ ] main.tsx (providers)
- [ ] Index.tsx, Header.tsx, Hero.tsx, Services.tsx, Portfolio.tsx, Footer.tsx

### 5. Testar & Deploy [PENDENTE]
- [ ] npm run dev → localhost:5173/admin
- [ ] Login admin/123 → editar/salvar → verificar /
- [ ] Commit/push GitHub

**Próximo passo atual: 4. Editar componentes landing para usar siteData do context.**
