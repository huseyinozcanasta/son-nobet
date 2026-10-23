package com.huseyin.sonnobet;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.graphics.Color;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

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
        view.setWebViewClient(new WebViewClient());
        WebSettings settings = view.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        view.loadUrl("file:///android_asset/index.html");
        setContentView(view);
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
