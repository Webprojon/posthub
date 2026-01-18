import { FEATURES, TECHS } from "@/widgets/constants/home-data";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col justify-center items-center px-4 sm:px-0">
      <div className="text-center max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              PostHub
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto">
            A modern, performant blogging platform built with Next.js. Create,
            share, and manage your posts with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="p-4 rounded-lg border border-white/10 bg-gray-800/50 hover:bg-gray-800 transition-colors"
            >
              <Icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/posts"
            className="px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-white"
          >
            Explore Posts
            <RiArrowRightLine className="w-4 h-4" />
          </Link>
          <Link
            href="/create"
            className="px-6 sm:px-8 py-3 border border-blue-600 text-blue-400 hover:bg-blue-600/10 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </Link>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-3">
            Built with modern technologies:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {TECHS.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800 border border-white/10 rounded-full text-xs font-medium text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
