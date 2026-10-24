package com.huseyin.sonnobet;

import android.annotation.SuppressLint;
import android.webkit.JavascriptInterface;
import android.content.ClipboardManager;
import android.content.ClipData;
import android.content.Context;
import org.json.JSONObject;
import org.json.JSONArray;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import android.app.Activity;
import android.os.Bundle;
import android.graphics.Color;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;

public class MainActivity extends Activity {
    private WebView view;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().setStatusBarColor(Color.rgb(7, 11, 22));
        getWindow().setNavigationBarColor(Color.rgb(7, 11, 22));

        view = new WebView(this);
        view.setBackgroundColor(Color.rgb(7, 11, 22));
        view.setWebChromeClient(new WebChromeClient());
        view.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView webView, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (uri != null && ("https".equals(uri.getScheme()) || "http".equals(uri.getScheme()))) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); }
                    catch (Exception ignored) { }
                    return true;
                }
                return false;
            }
        });
        WebSettings settings = view.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        view.addJavascriptInterface(new SonBridge(), "SonBridge");
        view.loadUrl("file:///android_asset/index.html");
        setContentView(view);
    }


    // Exposes only release metadata and clipboard export to the trusted bundled file:// page.
    private final class SonBridge {
        @JavascriptInterface
        public void copyText(String payload) {
            if (payload == null || payload.length() > 2000000) return;
            runOnUiThread(() -> {
                ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                if (cm != null) cm.setPrimaryClip(ClipData.newPlainText("SON NÖBET progress", payload));
            });
        }

        @JavascriptInterface
        public void checkUpdates() {
            new Thread(() -> {
                JSONObject result = new JSONObject();
                HttpURLConnection conn = null;
                try {
                    URL url = new URL("https://api.github.com/repos/huseyinozcanasta/son-nobet/releases?per_page=25");
                    conn = (HttpURLConnection) url.openConnection();
                    conn.setConnectTimeout(9000);
                    conn.setReadTimeout(9000);
                    conn.setRequestProperty("Accept", "application/vnd.github+json");
                    conn.setRequestProperty("User-Agent", "SonNobet-Android-ReleaseCheck");
                    if (conn.getResponseCode() != 200) throw new Exception("GitHub HTTP " + conn.getResponseCode());
                    ByteArrayOutputStream out = new ByteArrayOutputStream();
                    try (InputStream input = conn.getInputStream()) {
                        byte[] buffer = new byte[8192];
                        int count;
                        while ((count = input.read(buffer)) != -1) {
                            out.write(buffer, 0, count);
                            if (out.size() > 600000) throw new Exception("Sürüm listesi beklenenden büyük");
                        }
                    }
                    JSONArray releases = new JSONArray(out.toString(StandardCharsets.UTF_8.name()));
                    String bestTag = null, bestUrl = null;
                    int[] best = new int[]{-1, -1, -1};
                    for (int i=0; i<releases.length(); i++) {
                        JSONObject rel = releases.optJSONObject(i);
                        if (rel == null || rel.optBoolean("draft", false)) continue;
                        String tag = rel.optString("tag_name", "");
                        if (!tag.matches("v[0-9]+\\.[0-9]+\\.[0-9]+")) continue;
                        String[] parts = tag.substring(1).split("\\.");
                        int[] ver = new int[]{Integer.parseInt(parts[0]), Integer.parseInt(parts[1]), Integer.parseInt(parts[2])};
                        boolean newer = bestTag == null || ver[0]>best[0] ||
                             (ver[0]==best[0] && ver[1]>best[1]) ||
                             (ver[0]==best[0] && ver[1]==best[1] && ver[2]>best[2]);
                        if (!newer) continue;
                        JSONArray assets = rel.optJSONArray("assets");
                        if (assets == null) continue;
                        for (int j=0; j<assets.length(); j++) {
                            JSONObject asset = assets.optJSONObject(j);
                            if (asset == null) continue;
                            String path = asset.optString("browser_download_url", "");
                            String filename = asset.optString("name", "");
                            if (filename.endsWith("-debug.apk") && path.startsWith("https://github.com/huseyinozcanasta/son-nobet/releases/download/")) {
                                best = ver; bestTag = tag; bestUrl = path; break;
                            }
                        }
                    }
                    if (bestTag == null) throw new Exception("İndirilebilir GitHub APK sürümü bulunamadı");
                    result.put("tag", bestTag); result.put("apk", bestUrl);
                } catch (Exception e) {
                    try { result.put("error", e.getMessage() == null ? "Ağ hatası" : e.getMessage()); } catch (Exception ignored) { }
                } finally {
                    if (conn != null) conn.disconnect();
                }
                String response = JSONObject.quote(result.toString());
                runOnUiThread(() -> {
                    if (view != null) view.evaluateJavascript(
                        "window.SON_CENTER && window.SON_CENTER.onRelease(" + response + ")", null
                    );
                });
            }).start();
        }
    }

    @Override
    public void onBackPressed() {
        if (view != null) {
            view.evaluateJavascript("window.appBack && window.appBack()", null);
        } else {
            super.onBackPressed();
        }
    }
}
