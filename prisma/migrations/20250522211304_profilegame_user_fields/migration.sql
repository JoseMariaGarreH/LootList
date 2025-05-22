
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ProfileGame] DROP CONSTRAINT [ProfileGame_gameId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProfileGame] DROP CONSTRAINT [ProfileGame_profileId_fkey];

-- DropIndex
ALTER TABLE [dbo].[ProfileGame] DROP CONSTRAINT [ProfileGame_profileId_gameId_key];

-- AlterTable
ALTER TABLE [dbo].[ProfileGame] ADD [liked] BIT,
[rating] FLOAT(53),
[status] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [Users_updatedAt_df];

-- CreateIndex
ALTER TABLE [dbo].[ProfileGame] ADD CONSTRAINT [ProfileGame_profileId_gameId_key] UNIQUE NONCLUSTERED ([profileId], [gameId]);

-- AddForeignKey
ALTER TABLE [dbo].[ProfileGame] ADD CONSTRAINT [ProfileGame_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profiles]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProfileGame] ADD CONSTRAINT [ProfileGame_gameId_fkey] FOREIGN KEY ([gameId]) REFERENCES [dbo].[Games]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
