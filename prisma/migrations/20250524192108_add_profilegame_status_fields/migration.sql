/*
  Warnings:

  - You are about to drop the column `status` on the `ProfileGame` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ProfileGame] DROP COLUMN [status];
ALTER TABLE [dbo].[ProfileGame] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [ProfileGame_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[played] BIT,
[playing] BIT,
[updatedAt] DATETIME2 NOT NULL CONSTRAINT [ProfileGame_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
[whishlist] BIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
