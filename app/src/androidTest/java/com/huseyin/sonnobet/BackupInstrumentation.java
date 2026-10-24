package com.huseyin.sonnobet;

import android.app.Activity;
import android.app.Instrumentation;
import android.content.Intent;
import android.content.Context;
import android.content.ClipboardManager;
import android.content.ClipData;
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.net.Uri;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
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
            // Feed a real UTF-8 file through the same native result handler used by Android's picker.
            File backupFile = new File(target.getCacheDir(), "instrumentation-backup.json");
            String fileBackup = "{\"schema\":\"son-nobet-progress\",\"schemaVersion\":1,\"items\":{\"son-nobet-v1\":{\"xp\":1234,\"chapter\":[3,2,1],\"passed\":false}}}";
            try (FileOutputStream out = new FileOutputStream(backupFile)) { out.write(fileBackup.getBytes(StandardCharsets.UTF_8)); }
            runOnMainSync(() -> ((MainActivity)target).onActivityResult(MainActivity.IMPORT_BACKUP, Activity.RESULT_OK, new Intent().setData(Uri.fromFile(backupFile))));
            waitFor("document.getElementById('progressText').value.indexOf('1234')>=0 && document.getElementById('restorePreview').textContent.indexOf('AKTARIMI ONAYLA')>=0");
            if (!"true".equals(js("s.xp===765"))) throw new Exception("File preview wrote progress before confirmation");
            runOnMainSync(() -> web.evaluateJavascript("SON_CENTER.commitRestore()", null));
            waitFor("window.SON_CENTER && window.s && s.xp===1234");
            runOnMainSync(() -> ((MainActivity)target).onActivityResult(MainActivity.IMPORT_BACKUP, Activity.RESULT_CANCELED, null));
            waitFor("document.getElementById('progressStatus').textContent.indexOf('iptal')>=0");
            runOnMainSync(() -> {
                ClipboardManager cm = (ClipboardManager)target.getSystemService(Context.CLIPBOARD_SERVICE);
                cm.setPrimaryClip(ClipData.newPlainText("test backup", fileBackup.replace("1234", "2468")));
                web.evaluateJavascript("SON_CENTER.pasteClipboard()", null);
            });
            waitFor("document.getElementById('progressText').value.indexOf('2468')>=0 && document.getElementById('restorePreview').textContent.indexOf('AKTARIMI ONAYLA')>=0");
            if (!"true".equals(js("s.xp===1234"))) throw new Exception("Clipboard preview wrote progress early");
            runOnMainSync(() -> web.evaluateJavascript("SON_CENTER.commitRestore()", null));
            waitFor("window.SON_CENTER && window.s && s.xp===2468");
            runOnMainSync(() -> web.evaluateJavascript("SON_CENTER.requestUndo();SON_CENTER.commitUndo()", null));
            waitFor("window.SON_CENTER && window.s && s.xp===1234");
            backupFile.delete();
            output.putString("stream", "SON_NOBET_ANDROID_BACKUP_PASS: explicit confirmation, storage, reload, FBT, quest progress, native UTF-8 file, cancellation, clipboard paste and undo\n");
            finish(Activity.RESULT_OK, output);
        } catch (Exception problem) {
            output.putString("stream", "SON_NOBET_ANDROID_BACKUP_FAIL: " + problem.toString() + "\n");
            finish(Activity.RESULT_CANCELED, output);
        } finally { if (activity != null) { Activity target = activity; runOnMainSync(target::finish); } }
    }
}
