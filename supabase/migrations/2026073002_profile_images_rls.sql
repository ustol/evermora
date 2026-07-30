-- Allow authenticated users to upload to profile-images bucket
-- The bucket was created with the service_role key; this policy
-- lets browser clients (using the anon publishable key) upload.
CREATE POLICY "authenticated users can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images'
);

-- Allow authenticated users to select their own uploads
CREATE POLICY "authenticated users can view profile images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile-images'
);

-- Allow authenticated users to update/delete their own objects
CREATE POLICY "authenticated users can update own profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images')
WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "authenticated users can delete own profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');
