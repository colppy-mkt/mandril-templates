const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const yaml = require("js-yaml");

const read = (p) => fs.readFileSync(p, "utf8");

function loadYaml(filePath) {
  return yaml.load(read(filePath));
}

async function main() {
  const root = path.join(__dirname, "..");

  const headStylesPath = path.join(root, "src/layouts/head-styles.html");
  const layoutPath = path.join(root, "src/layouts/base.ejs");

  const headerPath = path.join(root, "src/partials/header.html");
  const footerPath = path.join(root, "src/partials/footer.html");

  // ✅ UN SOLO BODY, SIEMPRE EL MISMO NOMBRE
  const bodyTplPath = path.join(root, "src/bodies/simple.ejs");

  const contentDir = path.join(root, "src/content");
  const distDir = path.join(root, "dist");

  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

  const headStyles = fs.existsSync(headStylesPath) ? read(headStylesPath) : "";
  const headerHtml = read(headerPath);
  const footerHtml = read(footerPath);

  if (!fs.existsSync(bodyTplPath)) {
    throw new Error("No existe src/bodies/simple.ejs");
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"));

  for (const file of files) {
    const slug = file.replace(/\.(yml|yaml)$/i, "");
    const data = loadYaml(path.join(contentDir, file)) || {};

    const subject = data.subject || slug;
    const previewText = data.previewText || "";
    const mainHtml = (data.mainHtml || "").trim();

    if (!mainHtml) {
      throw new Error(`Falta mainHtml en ${file}`);
    }

    // ✅ SOLO PASAMOS mainHtml (NO title, NO paragraphs)
    const bodyHtml = await ejs.renderFile(bodyTplPath, { mainHtml }, { async: true });

    const html = await ejs.renderFile(
      layoutPath,
      { subject, previewText, headStyles, headerHtml, footerHtml, bodyHtml },
      { async: true }
    );

    fs.writeFileSync(path.join(distDir, `${slug}.html`), html, "utf8");
    console.log(`✅ Generado: dist/${slug}.html`);
  }
}

main().catch((err) => {
  console.error("❌ Error en build:", err.message);
  process.exit(1);
});