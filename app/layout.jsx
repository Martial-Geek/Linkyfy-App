import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Linkyfy",
  description: "Connect to Professionals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
