const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-auto w-full max-w-sm">{children}</div>
    </div>
  );
};

export default AuthLayout;
