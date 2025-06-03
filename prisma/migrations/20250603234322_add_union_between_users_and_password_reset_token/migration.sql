/*
  Warnings:

  - Added the required column `userId` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
EXEC SP_RENAME N'dbo.Comment_pkey', N'Comments_pkey';

-- AlterTable
ALTER TABLE [dbo].[PasswordResetToken] ADD [userId] INT NOT NULL;

-- RenameForeignKey
EXEC sp_rename 'dbo.Comment_gameId_fkey', 'Comments_gameId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.Comment_profileId_fkey', 'Comments_profileId_fkey', 'OBJECT';

-- AddForeignKey
ALTER TABLE [dbo].[PasswordResetToken] ADD CONSTRAINT [PasswordResetToken_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
