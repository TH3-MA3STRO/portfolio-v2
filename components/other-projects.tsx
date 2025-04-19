"use client";

import { useEffect, useState } from "react";
import { Loader2, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
const gh_token = process.env.NEXT_PUBLIC_GITHUB_TOKEN!;
console.log(gh_token)
interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  fork: boolean;
  homepage: string | null;
  language: string | null;
}

export default function OtherProjects() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const featuredProjects = ["Pharmora", "InsureFi", "HackNight"];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://api.github.com/users/th3-ma3stro/repos",
          {
            headers: {
              Authorization: `token ${gh_token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API Error: ${response.status}`);
        }

        const data = await response.json();

        const filtered = data.filter(
          (repo: Repository) =>
            !repo.fork && !featuredProjects.includes(repo.name)
        );

        setRepos(filtered);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching repos:", err);
        setError(err?.message || "Failed to load repositories.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const totalPages = Math.ceil(repos.length / itemsPerPage);

  const paginatedRepos = repos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById("other-projects")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="other-projects"
      className="py-16 px-4 md:px-6 lg:px-8 mx-auto w-[80vw]"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-[#e63946]">Other</span> Projects
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A collection of my open source work and side projects on GitHub.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#e63946]" />
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRepos.map((repo, index) => (
              <Card key={index} className="h-full transition-all dark:bg-[#2d2d2d] duration-300 hover:shadow-lg hover:scale-[1.02] border border-border">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="text-xl font-bold text-[#e63946]">
                      {repo.name}
                    </span>
                    {repo.language && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        {repo.language}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">
                    {repo.description || "No description provided"}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  {repo.homepage && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#e63946] hover:bg-[#d62836] text-white"
                      asChild
                    >
                      <Link
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {repos.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`h-8 w-8 ${
                    currentPage === i + 1 ? "bg-[#e63946] text-white" : ""
                  }`}
                  variant="outline"
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
