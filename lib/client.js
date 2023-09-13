import sanityClient from '@sanity/client';
import  ImageUrlBuilder  from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'ejhvyd5f',
    dataset: 'production',
    apiVersion: '2023-09-09',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)