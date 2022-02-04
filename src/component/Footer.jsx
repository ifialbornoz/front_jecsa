export default function Footer() {
  return (
    <div>
      <footer
        className="text-white py-2 bg-dark pt-2"
        style={{
          position: "relative",
          botton: "0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          flex: "0",
        }}
      >
        <div className="text-center">
          <b>© 2021 Copyright</b> | Tienda Deportiva Jecsa
        </div>
      </footer>
    </div>
  );
}
