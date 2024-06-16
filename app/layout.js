import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "../styles/app.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./AppState/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIBS",
  description: "Bids & Tenders website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: "#0077b5",
                borderRadius: 2,

                // Alias Token
                colorBgContainer: "#f6ffed",
              },
            }}
          >
            <Providers>
              <Header />
              {children}
              <Footer />
            </Providers>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
