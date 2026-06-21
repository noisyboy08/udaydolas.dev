import { GithubStars } from "@/registry/github-stars";

export default function GithubStarsDemo() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <GithubStars
        owner="noisyboy08"
        repo="udaydolas-portfolio"
        defaultCount={1240}
      />
      <GithubStars owner="vercel" repo="next.js" defaultCount={126000} />
    </div>
  );
}
