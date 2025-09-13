/*
  Warnings:

  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Comments] DROP CONSTRAINT [Comments_gameId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Comments] DROP CONSTRAINT [Comments_profileId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PasswordResetToken] DROP CONSTRAINT [PasswordResetToken_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProfileGame] DROP CONSTRAINT [ProfileGame_gameId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProfileGame] DROP CONSTRAINT [ProfileGame_profileId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Profiles] DROP CONSTRAINT [Profiles_userId_fkey];

-- DropTable
DROP TABLE [dbo].[Comments];

-- DropTable
DROP TABLE [dbo].[Games];

-- DropTable
DROP TABLE [dbo].[Profiles];

-- DropTable
DROP TABLE [dbo].[Users];

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Profile] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL CONSTRAINT [Profile_name_df] DEFAULT '',
    [firstSurname] NVARCHAR(1000) NOT NULL CONSTRAINT [Profile_firstSurname_df] DEFAULT '',
    [secondSurname] NVARCHAR(1000) NOT NULL CONSTRAINT [Profile_secondSurname_df] DEFAULT '',
    [bio] NVARCHAR(1000) NOT NULL CONSTRAINT [Profile_bio_df] DEFAULT '',
    [location] NVARCHAR(1000) NOT NULL CONSTRAINT [Profile_location_df] DEFAULT '',
    [pronoun] NVARCHAR(1000) NOT NULL CONSTRAINT [Profile_pronoun_df] DEFAULT '',
    [profileImage] NVARCHAR(1000) NOT NULL CONSTRAINT [Profile_profileImage_df] DEFAULT '',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Profile_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Profile_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Profile_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Game] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [platform] NVARCHAR(1000),
    [genre] NVARCHAR(1000),
    [releaseDate] DATETIME2,
    [imageUrl] NVARCHAR(1000),
    CONSTRAINT [Game_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profileId] INT NOT NULL,
    [gameId] INT NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Comment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Comment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Rol] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Rol_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Rol_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[Profile] ADD CONSTRAINT [Profile_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProfileGame] ADD CONSTRAINT [ProfileGame_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profile]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProfileGame] ADD CONSTRAINT [ProfileGame_gameId_fkey] FOREIGN KEY ([gameId]) REFERENCES [dbo].[Game]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profile]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_gameId_fkey] FOREIGN KEY ([gameId]) REFERENCES [dbo].[Game]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PasswordResetToken] ADD CONSTRAINT [PasswordResetToken_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
