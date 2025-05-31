BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Comments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profileId] INT NOT NULL,
    [gameId] INT NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Comment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Comment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Comments] ADD CONSTRAINT [Comment_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profiles]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comments] ADD CONSTRAINT [Comment_gameId_fkey] FOREIGN KEY ([gameId]) REFERENCES [dbo].[Games]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
