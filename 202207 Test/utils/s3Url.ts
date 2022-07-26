export default function s3Url(path: string) {
  return `${process.env.NEXT_PUBLIC_CDN_URL}/${path}`;
}
