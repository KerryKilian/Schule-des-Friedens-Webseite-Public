export default function ErrorFallback({ error }: { error: Error }) {
  return (
    <div>
      <div className="">
      <h1>Ein Fehler ist aufgetreten.</h1>
      <pre>{error.message}</pre>
      <pre>{error.stack}</pre>
    </div>
    </div>
    
  );
}
