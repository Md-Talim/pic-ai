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

export const SignUpCard = () => {
  const handleSignInWithGitHub = () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create account.</CardTitle>
        <CardDescription>
          Create an account with email or GitHub.
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
        Already have an account?{" "}
        <Link
          href="/signin"
          className="hover:cursor ml-2 text-blue-600 hover:underline"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
};