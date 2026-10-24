package com.huseyin.sonnobet;

import android.app.Activity;
import android.app.Instrumentation;
import android.content.Intent;
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.WebView;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

/** Exercises the production bundled page in Android WebView, not a desktop mock. */
public final class BackupInstrumentation extends Instrumentation {
    private WebView web;
    @Override public void onCreate(Bundle args) { super.onCreate(args); start(); }
    private String js(String script) throws Exception {
        CountDownLatch ready = new CountDownLatch(1);
        AtomicReference<String> result = new AtomicReference<>("");
        runOnMainSync(() -> web.evaluateJavascript(script, value -> { result.set(value); ready.countDown(); }));
        if (!ready.await(8, TimeUnit.SECONDS)) throw new Exception("JavaScript callback timed out");
        return result.get();
    }
    private void waitFor(String expression) throws Exception {
        long deadline = System.currentTimeMillis() + 30000;
        while (System.currentTimeMillis() < deadline) {
            if ("true".equals(js("Boolean(" + expression + ")"))) return;
            Thread.sleep(200);
        }
        throw new Exception("Condition did not become true: " + expression);
    }
    @Override public void onStart() {
        Bundle output = new Bundle();
        Activity activity = null;
        try {
            Intent intent = new Intent(Intent.ACTION_MAIN).setClassName(getTargetContext().getPackageName(), MainActivity.class.getName()).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            activity = startActivitySync(intent);
            Activity target = activity;
            runOnMainSync(() -> web = (WebView)((ViewGroup)target.findViewById(android.R.id.content)).getChildAt(0));
            waitFor("window.SON_CENTER && window.FBT && window.NOBET115");
            String fixture = "({schema:'son-nobet-progress',schemaVersion:1,items:{'son-nobet-v1':{xp:765,v2started:true,chapter:[1,2,3],passed:false,quests115:{17:{done:[3,3,3],picks:{},boss:{},passed:true,best:7}}},'son-nobet-fbt-v1':{xp:45,records:{16:{grade:2,ever:true,attempts:1,due:'2026-10-25'}}}}})";
            if (!"true".equals(js("FBT.openUpdates();window.confirm=function(){return false};document.getElementById('progressText').value=JSON.stringify("+fixture+");SON_CENTER.restore();Boolean(document.getElementById('restorePreview').textContent.indexOf('AKTARIMI ONAYLA')>=0 && !JSON.parse(localStorage.getItem('son-nobet-fbt-v1')||'{\"records\":{}}').records[16])"))) throw new Exception("Preview failed or wrote progress early");
            runOnMainSync(() -> web.evaluateJavascript("SON_CENTER.commitRestore()", null));
            waitFor("window.s && s.xp===765 && s.quests115 && s.quests115[17].passed===true && window.SON_CENTER");
            if (!"true".equals(js("JSON.parse(localStorage.getItem('son-nobet-fbt-v1')).records[16].grade===2 && document.getElementById('progressStatus').textContent.indexOf('Aktarım tamamlandı')>=0"))) throw new Exception("Restored state or visible receipt is missing");
            output.putString("stream", "SON_NOBET_ANDROID_BACKUP_PASS: preview, explicit confirmation, storage, reload, FBT and quest progress preserved\n");
            finish(Activity.RESULT_OK, output);
        } catch (Exception problem) {
            output.putString("stream", "SON_NOBET_ANDROID_BACKUP_FAIL: " + problem.toString() + "\n");
            finish(Activity.RESULT_CANCELED, output);
        } finally { if (activity != null) { Activity target = activity; runOnMainSync(target::finish); } }
    }
}
