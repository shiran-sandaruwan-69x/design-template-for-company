import EarthLoadingAnimation from "./EarthLoadingAnimation";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
          IntelleJ
        </h1>

        <div className="w-64 h-64 mb-8">
          <EarthLoadingAnimation />
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Loading amazing experiences...
        </p>
      </div>
    </div>
  );
}
