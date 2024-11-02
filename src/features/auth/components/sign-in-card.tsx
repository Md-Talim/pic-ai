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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { TriangleAlertIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const error = params.get("error");

  const handleCredentialSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signIn("credentials", {
      email: email,
      password: password,
      redirectTo: "/",
    });
  };

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
      <CardContent className="space-y-5">
        {!!error && (
          <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-2 text-sm text-destructive">
            <TriangleAlertIcon className="size-4" />
            <p>Invalid email or password!</p>
          </div>
        )}
        <form onSubmit={handleCredentialSignIn} className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
        <Separator />
        <Button
          size="lg"
          variant="outline"
          onClick={handleSignInWithGitHub}
          className="flex w-full items-center gap-x-2"
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
