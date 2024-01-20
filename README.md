Multi Tenant Role Based Access Control (RBAC) Authentication API
---

### Multi-Tenant Application Overview:

This software architecture is designed to serve multiple users or tenants on a shared infrastructure, a perfect fit for scalable and cost-effective cloud-based services. In a multi-tenant setup, a single application instance runs on a server, accommodating various clients or organizations referred to as "tenants."

### Key Features:

- #### Isolation for Customization: 
  Each tenant enjoys a customized experience without affecting others. Data, configurations, and user settings are neatly separated, allowing tailored adjustments for individual needs.

- #### Resource Efficiency: 
  By sharing a common codebase and infrastructure, multi-tenancy optimizes resource utilization and reduces operational costs. It's a powerful solution for maintaining consistency while serving diverse user requirements.
---

### 🏷️ Developed features

- Create an application;
- Register a user for an application;
- Login;
- Create a role;
- Assign a role to a user;
- Check user permissions with a guard;
---

### ⚒️ Techs
- [Drizzle ORM](https://orm.drizzle.team/);
- [Fastify](https://fastify.dev/);
- [PostgreSQL](https://www.postgresql.org/);
- [Typescript](https://www.typescriptlang.org/);
- [NodeJs.](https://nodejs.org/en)

<p align="center">Made with 💙 by <strong>Chriszao</strong>.</p>
