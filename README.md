Esta aplicación se puede desplegar siguiendo estos pasos:

1. **Requisitos previos**
   - Node.js 18 o superior
   - npm 9 o superior
   - Variables de entorno configuradas

2. **Clonar el repositorio**
   - `git clone https://github.com/JoseMariaGarreH/LootList`
   - `cd LootList`

3. **Instalar dependencias**
   - Ejecuta el comando `npm install` para instalar todos los recursos y dependencias del proyecto.

4. **Configurar las variables de entorno**
   - Configura las variables de entorno basándote en el archivo `.env.example`. Cópialo y reemplaza los valores según tu configuración en el archivo `.env`.

5. **Configurar la base de datos**
   - Genera el Prisma Client con: `npx prisma generate`
   - Aplica las migraciones existentes con: `npx prisma migrate deploy`
   - **Nota:** Estas migraciones están preparadas para SQL Server.
     - Si utilizas otra base de datos, deberás borrar la carpeta `prisma/migrations`, cambiar el proveedor en el archivo `schema.prisma`, y generar nuevas migraciones con: `npx prisma migrate dev --name init`

6. **Construir la aplicación**
   - Utiliza el comando `npm run build` para compilar la aplicación.

7. **Iniciar el proyecto**
   - En modo producción ejecuta: `npm start`
   - En modo desarrollo ejecuta: `npm run dev`

8. **Acceder a la aplicación**
   - Abre tu navegador y accede a [http://localhost:3000](http://localhost:3000) (o el puerto configurado).

9. **Notas adicionales**
   - Para funciones como el guardado de imágenes de avatar, necesitarás una cuenta en Cloudinary (servicio utilizado en este proyecto).
   - Para importar juegos desde la API de RAWG, deberás registrarte y obtener una API key, luego podrás ejecutar el script correspondiente en la carpeta de scripts.
   - **Nota:** Al presentar el proyecto, se incluirá un archivo `.env` con los valores necesarios para facilitar el despliegue local.


### Licencia

Este proyecto está licenciado bajo [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/).