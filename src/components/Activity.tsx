import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { Avatar, Tooltip, CircularProgress, Stack } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

// Configuration
const REPOS = [
  { 
    owner: "mooseneuro", 
    repo: "moose-core", 
    upstream: "BhallaLab/moose-core",
  },
  { owner: "mooseneuro", repo: "jardesigner" },
  { owner: "mooseneuro", repo: "moose-examples" },
  { owner: "mooseneuro", repo: "moose-notebooks" }
];

interface RepoData {
  contributors: any[];
  commits: any[];
  latestRelease: any | null;
  isFromUpstream: boolean;
}

const RepoSection = ({ repoConfig }: { repoConfig: typeof REPOS[0] }) => {
  const { owner, repo, upstream } = repoConfig;
  const [data, setData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch contributors and commits from the mooseneuro fork
        const [contRes, commRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`),
          fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`),
        ]);

        // 2. Try to fetch release from mooseneuro first
        let releaseRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
        let isUpstream = false;

        // 3. Fallback to BhallaLab if mooseneuro returns 404/no release
        if (!releaseRes.ok && upstream) {
          releaseRes = await fetch(`https://api.github.com/repos/${upstream}/releases/latest`);
          isUpstream = true;
        }

        setData({
          contributors: contRes.ok ? await contRes.json() : [],
          commits: commRes.ok ? await commRes.json() : [],
          latestRelease: releaseRes.ok ? await releaseRes.json() : null,
          isFromUpstream: isUpstream
        });
      } catch (e) {
        console.error(`Error loading ${repo}:`, e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [owner, repo, upstream]);

  if (loading) return <div className="py-10 text-center"><CircularProgress size={24} /></div>;
  if (!data) return null;

  return (
    <div className="mb-20 border-b border-gray-100 pb-12 last:border-0">
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{repo}</h2>
        <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-200">
          {owner}/{repo}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Releases & Commits */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4 flex items-center gap-2">
            Latest Release {data.isFromUpstream && <span className="normal-case font-normal text-[10px] text-gray-300">(Upstream)</span>}
          </h3>
          
          {data.latestRelease ? (
            <div className="mb-8 p-5 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-blue-900 text-xl leading-tight">
                    {data.latestRelease.name || data.latestRelease.tag_name}
                  </h4>
                  <p className="text-xs text-blue-600 mt-1">
                    Published {new Date(data.latestRelease.published_at).toLocaleDateString()}
                  </p>
                </div>
                <a href={data.latestRelease.html_url} target="_blank" rel="noreferrer" className="bg-white p-2 rounded-full border border-blue-200 hover:bg-blue-50 text-blue-600 transition-colors">
                  <GitHubIcon fontSize="small" />
                </a>
              </div>
              <div 
                className="text-sm text-gray-700 mt-4 prose prose-sm max-w-none line-clamp-4" 
                dangerouslySetInnerHTML={{ __html: marked.parse(data.latestRelease.body || "") }} 
              />
            </div>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-sm text-gray-500 italic">
              No official releases found. Checking for ongoing development...
            </div>
          )}

          <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">Recent Commits</h3>
          <div className="space-y-4">
            {data.commits.map((c: any) => (
              <div key={c.sha} className="flex items-start gap-3 group">
                <Stack direction="row" spacing={2}>
                <Avatar src={c.author?.avatar_url} sx={{ width: 28, height: 28, mt: 0.5 }} />
                </Stack>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium truncate group-hover:text-blue-600 transition-colors cursor-default">
                    {c.commit.message.split('\n')[0]}
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {c.sha.substring(0, 7)} • {new Date(c.commit.author.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Contributors */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">Contributors</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {data.contributors.slice(0, 15).map((user: any) => (
              <Tooltip key={user.login} title={`${user.login} (${user.contributions} contributions)`} arrow placement="top">
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  <Avatar 
                    src={user.avatar_url} 
                    variant="rounded" 
                    sx={{ 
                      width: '100%', 
                      height: 'auto', 
                      aspectRatio: '1/1',
                      borderRadius: '8px',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 3, filter: 'grayscale(0)' },
                      filter: 'grayscale(0.2)'
                    }} 
                  />
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Activity: React.FC = () => {
  return (
    <section className="bg-white px-6 sm:px-12 lg:px-32 py-20 max-w-7xl mx-auto">

      {REPOS.map((r) => (
        <RepoSection key={`${r.owner}-${r.repo}`} repoConfig={r} />
      ))}
    </section>
  );
};

export default Activity;