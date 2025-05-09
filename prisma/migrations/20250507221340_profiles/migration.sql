BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [Users_updatedAt_df];

-- CreateTable
CREATE TABLE [dbo].[Profiles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL CONSTRAINT [Profiles_name_df] DEFAULT '',
    [firstSurname] NVARCHAR(1000) NOT NULL CONSTRAINT [Profiles_firstSurname_df] DEFAULT '',
    [SecondSurname] NVARCHAR(1000) NOT NULL CONSTRAINT [Profiles_SecondSurname_df] DEFAULT '',
    [bio] NVARCHAR(1000) NOT NULL CONSTRAINT [Profiles_bio_df] DEFAULT '',
    [location] NVARCHAR(1000) NOT NULL CONSTRAINT [Profiles_location_df] DEFAULT '',
    [pronoun] NVARCHAR(1000) NOT NULL CONSTRAINT [Profiles_pronoun_df] DEFAULT '',
    [profileImage] NVARCHAR(1000) NOT NULL CONSTRAINT [Profiles_profileImage_df] DEFAULT '',
    CONSTRAINT [Profiles_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Profiles_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Profiles] ADD CONSTRAINT [Profiles_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
