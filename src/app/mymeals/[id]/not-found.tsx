"use client";

export default function Error() {
  return (
    <div
      style={{
        height: "calc(100vh - 64px)",
      }}
      className="justify-cente flex w-screen items-center"
    >
      <h1 className="w-full text-center">
        Oups, we couldn&apos;t find the page you are looking for
      </h1>
    </div>
  );
}
