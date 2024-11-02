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
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { TriangleAlertIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export const SignUpCard = () => {
  const mutation = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            redirectTo: "/",
          });
        },
      },
    );
  };

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
      <CardContent className="space-y-5">
        {!!mutation.error && (
          <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-2 text-sm text-destructive">
            <TriangleAlertIcon className="size-4" />
            <p>Something went wrong! Try again.</p>
          </div>
        )}
        <form onSubmit={handleCredentialSignUp} className="space-y-2">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={mutation.isPending}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={mutation.isPending}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            minLength={8}
            maxLength={20}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={mutation.isPending}
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            Create account
          </Button>
        </form>
        <Separator />
        <Button
          size="lg"
          variant="outline"
          onClick={handleSignInWithGitHub}
          className="flex w-full items-center gap-x-2"
          disabled={mutation.isPending}
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
