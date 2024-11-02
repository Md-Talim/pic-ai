"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const SignInCard = () => {
  const handleSignInWithGitHub = () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>
          Sign in with your credentials or GitHub.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          size="lg"
          onClick={handleSignInWithGitHub}
          className="flex items-center gap-x-2"
        >
          <GitHubLogoIcon />
          <span>Continue with GitHub</span>
        </Button>
      </CardContent>
      <CardFooter>
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="hover:cursor ml-2 text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
};
