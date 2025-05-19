BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Games] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [platform] NVARCHAR(1000),
    [releaseDate] DATETIME2,
    [imageUrl] NVARCHAR(1000),
    CONSTRAINT [Games_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProfileGame] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profileId] INT NOT NULL,
    [gameId] INT NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ProfileGame_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ProfileGame_profileId_gameId_type_key] UNIQUE NONCLUSTERED ([profileId],[gameId],[type])
);

-- AddForeignKey
ALTER TABLE [dbo].[ProfileGame] ADD CONSTRAINT [ProfileGame_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profiles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProfileGame] ADD CONSTRAINT [ProfileGame_gameId_fkey] FOREIGN KEY ([gameId]) REFERENCES [dbo].[Games]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
