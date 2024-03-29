/**
 * Allows you to encode and decode strings from Base64.
 *
 * This is useful when passing string to places where some characters are not allowed.
 *
 * This example demonstrates simple use of the `Base64` module. The code prints the input string, and the computed Base64 string.
 * ```js
 *     var Base64 = require("FuseJS/Base64");
 *     var string = "Hello, world!";
 *     console.log(string); //LOG: Hello, world!
 *     console.log(Base64.encodeAscii(string)); //LOG: SGVsbG8sIHdvcmxkIQ==
 * ```
 */
declare module "FuseJS/Base64" {
    /**
     * Decodes the given base64 value to an ASCII string representation
     * ```js
     *     var Base64 = require("FuseJS/Base64");
     *     console.log(Base64.decodeAscii("SGVsbG8sIHdvcmxkIQ==")); //LOG: Hello, world!
     * ```
     */
    function decodeAscii(value: string): string;

    /**
     * Decodes the given base64 string to an ArrayBuffer.
     * ```js
     *     var Base64 = require("FuseJS/Base64");
     *     var buf = Base64.decodeBuffer("NxMAAA==");
     *     var view = new Int32Array(data);
     *     // Should print 0x1337
     *     console.log("0x" + view[0].toString(16));
     * ```
     */
    function decodeBuffer(base64String: string): ArrayBuffer;

    /**
     * Decodes the given base64 Latin-1 encoded bytes to a string.
     * ```js
     *     var Base64 = require("FuseJS/Base64");
     *     // Prints "hello world"
     *     console.log(Base64.decodeLatin1("aGVsbG8gd29ybGQ="));
     * ```
     */
    function decodeLatin1(stringToDecode: string): string;

    /**
     * Decodes the given base64 value to an UTF8 string representation
     * ```js
     *     var Base64 = require("FuseJS/Base64");
     *     console.log(Base64.encodeUtf8("Rm9vIMKpIGJhcg==")); //LOG: Foo © bar
     * ```
     */
    function decodeUtf8(value: string): string;

    /**
     * Encodes the given ASCII value to base64 string representation
     * ```js
     *     var Base64 = require("FuseJS/Base64");
     *     console.log(Base64.encodeAscii("Hello, world!")); //LOG: SGVsbG8sIHdvcmxkIQ==
     * ```
     */
    function encodeAscii(value: string): string;

    /**
     * Encodes given array buffer to base64.
     * ```js
     *     var Base64 = require("FuseJS/Base64");
     *
     *     var data = new ArrayBuffer(4);
     *     var view = new Int32Array(data);
     *     view[0] = 0x1337;
     *
     *     console.log(Base64.encodeBuffer(data));
     * ```
     */
    function encodeBuffer(arrayBuffer: ArrayBuffer): string;

    /**
     * Encodes the given string to a Latin-1 base64 string.
     * ```js
     *     var Base64 = require("FuseJS/Base64");
     *     // Prints "aGVsbG8gd29ybGQ="
     *     console.log(Base64.encodeLatin1("hello world"));
     * ```
     */
    function encodeLatin1(stringToEncode: string): string;

    /**
     * Encodes the given UTF8 value to a base64 string representation
     * ```js
     *     var Base64 = require("FuseJS/Base64");
     *     console.log(Base64.encodeUtf8("Foo © bar")); //LOG: Rm9vIMKpIGJhcg==
     * ```
     */
    function encodeUtf8(value: string): string;
}

/**
 * The bundle API allows you to read files that is bundled with the application, defined in the project file (using `<filename>:Bundle`).
 *
 * ```js
 * var Bundle = require("FuseJS/Bundle");
 * ```
 *
 * You can read up on bundling files [here](/docs/assets/bundle)
 */
declare module "FuseJS/Bundle" {
    /**
     * Asynchronously reads a file from the application bundle and writes it to a destination on the device.
     * Use with `FuseJS/FileSystem` to determine destination paths. This is useful for extracting html and associated content for local use with WebView via `file://` protocol.
     *
     * ```js
     * var Bundle = require("FuseJS/Bundle");
     * var FileSystem = require("FuseJS/FileSystem");
     * var Observable = require("FuseJS/Observable");
     * var urlForWebView = Observable();
     *
     * Bundle.extract("assets/site/page.html", FileSystem.dataDirectory + "site/page.html").then(function(resultPath) {
     *     urlForWebView.value = "file://" + resultPath;
     * });
     * ```
     */
    function extract(bundleFilePath: string, destinationPath: string): Promise<string>;

    /**
     * Fetch a list of every file bundled with the application.
     *
     * ```js
     * var Bundle = require("FuseJS/Bundle");
     *
     * Bundle.list().then(function(list) {
     *     //list is an array of paths, such as "assets/image.jpg"
     * });
     * ```
     */
    function list(): Promise<string[]>;

    /**
     * Asynchronously reads a file from the application bundle
     *
     * ```js
     * var Bundle = require("FuseJS/Bundle");
     *
     * Bundle.read("someData.json").then(function(contents) {
     *     console.log(contents);
     * }, function(error) {
     *     console.log("Error!", error);
     * });
     * ```
     */
    function read(filename: string): Promise<string>;

    /**
     * Read a bundled file as an ArrayBuffer of bytes
     *
     * ```js
     * var Observable = require("FuseJS/Observable");
     * var Bundle = require("FuseJS/Bundle");
     * var ImageTools = require("FuseJS/ImageTools");
     * var imageUrlToDisplay = Observable();
     *
     * Bundle.readBuffer("assets/image.jpg").then(function(buffer) {
     *     //Do something with the image data here
     * });
     * ```
     */
    function readBuffer(bundlePath: string): Promise<ArrayBuffer>;

    /**
     * Synchronously reads a file from the application bundle
     *
     * ```js
     * var Bundle = require("FuseJS/Bundle");
     *
     * var contents = Bundle.readSync("someData.json");
     * console.log(contents);
     * ```
     *
     * > Warning: This call will block until the operation is finished. If you are reading large amounts of data, use read() instead.
     */
    function readSync(filename: string): string;
}

/**
 * The Environment API allows you to check which platform your app is currently running on.
 *
 * You need to add a reference to `"FuseJS"` in your project file to use this feature.
 *
 * ## Examples
 *
 * You can check which platform your app is running on using the following boolean properties:
 * ```js
 *     var Environment = require('FuseJS/Environment');
 *
 *     if(Environment.ios)        console.log("Running on iOS");
 *     if(Environment.android)    console.log("Running on Android");
 *     if(Environment.preview)    console.log("Running in preview mode");
 *     if(Environment.mobile)     console.log("Running on iOS or Android");
 *     if(Environment.desktop)    console.log("Running on desktop");
 * ```
 * You can also get the version of the current *mobile* OS as a
 * human-readable string using the `mobileOSVersion` property.
 * ```js
 *     console.log(Environment.mobileOSVersion);
 * ```
 *
 * > *Note*
 * >
 * > On Android, `mobileOSVersion` returns [Build.VERSION.RELEASE](https://developer.android.com/reference/android/os/Build.VERSION.html#RELEASE)
 * > (e.g. `1.0` or `3.4b5`).
 * > On iOS, it returns a string in the format of `<major>.<minor>.<patch>`
 * > (e.g. `9.2.1`).
 * > Returns an empty string on all other platforms.
 */
declare module "FuseJS/Environment" {
    const ios: boolean;
    const android: boolean;
    const preview: boolean;
    const mobile: boolean;
    const desktop: boolean;

    /**
     * A user-readable OS version number.On Android, it returns [Build.VERSION.RELEASE](https://developer.android.com/reference/android/os/Build.VERSION.html#RELEASE)
     * (e.g. `1.0` or `3.4b5`).
     * On iOS, it returns a string in the format of `<major>.<minor>.<patch>` (e.g. `9.2.1`).
     * Returns an empty string on all other platforms.
     */
    const mobileOSVersion: string;
}

/**
 * Monitor the application lifecycle from JS
 *
 * The lifecycle of an app is the time from when your app starts to the time it terminates.
 * During this time the app will go through a number of states.
 *
 * The Lifecycle module allows you query the current state and also be alerted when the
 * app changes state.
 *
 * ## The States
 *
 * - Starting
 * - Background
 * - Foreground
 * - Interactive
 *
 * ### Starting
 * Your app start event is implicit, as this is when your JavaScript is first evaluated.
 *
 * ### Background
 * Your app is not the app the user is interactive with right now and so the operating system
 * has put it into a 'sleep' state.
 *
 * Whilst your app is in this state is is not allowed to run code, but you don't have to worry
 * about this as Fuse will ensure your JS/UX is not doing something when it shouldn't.
 *
 * ### Foreground
 * Your app is front and center on the user's device but they cannot yet interact with it. The
 * main reason to be in this state is that the user has opened the notification bar on iOS or
 * Android.
 *
 * ### Interactive
 * Your app is now in the foreground and is accepting input from the user.
 *
 * ## Changing States
 * It would be hard to work with app lifecycle if your app could just jump around the states
 * randomly. Instead we guarentee the following flow through the states:
 *
 * Starting
 *    ↓
 * Background ⟷ Foreground ⟷ Interactive
 *    ↓
 * Terminating
 *
 * ## No `terminating` event
 * You may be wondering why there is no `terminating` event. The reason is that on mobile
 * platforms the OS doesn't promise to call you when terminating your app. It may, but in
 * certain circumstances (low memory, emergency phone call, etc) it won't.
 *
 * Because of this the guides for mobile platforms strongly advise against using the `terminating`
 * event as a cue that the app is shutting down, instead you should be regularly 'checkpointing'
 * your app so you can recover from any kind of shutdown.
 *
 * Given that we are not meant to use it, we have opted not to expose the event.
 *
 * This module is an @EventEmitter, so the methods from @EventEmitter can be used to listen to events.
 *
 * ## Example
 * ```xml
 *     <JavaScript>
 *         var Lifecycle = require('FuseJS/Lifecycle');
 *
 *         Lifecycle.on("enteringForeground", function() {
 *             console.log("on enteringForeground");
 *         });
 *         Lifecycle.on("enteringInteractive", function() {
 *             console.log("on enteringInteractive");
 *         });
 *         Lifecycle.on("exitedInteractive", function() {
 *             console.log("on exitedInteractive");
 *         });
 *         Lifecycle.on("enteringBackground", function() {
 *             console.log("on enteringBackground");
 *         });
 *         Lifecycle.on("stateChanged", function(newState) {
 *             console.log("on stateChanged " + newState);
 *         });
 *         module.exports = { lifecycleState: Lifecycle.observe("stateChanged") }
 *     </JavaScript>
 *     <StackPanel>
 *         <Text TextWrapping="Wrap">Open the Fuse Monitor to see the logs</Text>
 *         <Text>Current lifecycle state:</Text>
 *         <Text Value="{lifecycleState}" />
 *     </StackPanel>
 * ```
 * In the above example we're using the @EventEmitter `on` method to listen to the different events.
 * We're also using the @EventEmitter `observe` method on the `"stateChanged"` event to get an @Observable containing the current state.
 */
declare module "FuseJS/Lifecycle" {
    const BACKGROUND: number;
    const FOREGROUND: number;
    const INTERACTIVE: number;

    /**
     * Will give you the current state as an integer
     * ```js
     *     var Lifecycle = require("FuseJS/Lifecycle");
     *
     *     console.log(Lifecycle.state === Lifecycle.BACKGROUND);
     *     console.log(Lifecycle.state === Lifecycle.FOREGROUND);
     *     console.log(Lifecycle.state === Lifecycle.INTERACTIVE);
     * ```
     */
    const state: number;

    type Event = "enteringBackground" |
                 "enteringForeground" |
                 "enteringInteractive" |
                 "exitedInteractive" |
                 "stateChanged";

    /**
     * Registers a function to be called when one of the following events occur.
     *
     * * `"enteringBackground"` - Triggered when the app is leaving the running state and is about to be suspended.
     * ```js
     *     var Lifecycle = require("FuseJS/Lifecycle");
     * * `"enteringForeground"` - Triggered when the app has left the suspended state and now is running.
     * You will receive this event when the app starts.
     * ```js
     *     var Lifecycle = require("FuseJS/Lifecycle");
     * * `"enteringInteractive"` - Triggered when the app is entering a state where it is fully focused and receiving events.
     * ```js
     *     var Lifecycle = require("FuseJS/Lifecycle");
     * * `"exitedInteractive"` - Triggered when the app is partially obscured or is no longer the focus (e.g. when you drag open the notification bar)
     * ```js
     *     var Lifecycle = require("FuseJS/Lifecycle");
     * * `"stateChanged"` - Triggered when the app's lifecycle state has changed.
     * ```js
     *     var Lifecycle = require("FuseJS/Lifecycle");
     */
    function on(event: Event, callback: () => void): void;
}

/**
 * Allows the capture of still images from the system camera.
 *
 * Images are returned as frozen JavaScript Image objects, consisting of a path, a filename, a width and a height.
 * Once created or acquired, Images can be passed around to other APIs to use, fetch or alter their underlying data.
 * All images are temporary "scratch images" until storage has been specified either through publishing to the CameraRoll or other.
 *
 * You need to add a reference to `"Fuse.Camera"` in your project file to use this feature.
 *
 * On Android using this API will request the CAMERA and WRITE_EXTERNAL_STORAGE permissions.
 *
 * ## Example
 * ```javascript
 *     var camera = require('FuseJS/Camera');
 *     camera.takePicture(640,480).then(function(image)
 *     {
 *         //Do things with image here
 *     }).catch(function(error) {
 *         //Something went wrong, see error for details
 *     });
 * ```
 */
declare module "FuseJS/Camera" {
    /**
     * Checks if device has permissions to access the camera.
     */
    function checkPermissions(): boolean;

    /**
     * Requests acccess to the camera
     */
    function requestPermissions(): boolean;

    /**
     * Starts an OS-specific image capture view and returns a Promise of the resulting Image.
     *
     * If the desiredWidth and height parameters are set, returns an Image scaled as close to the specified
     * width/height as possible while maintaining aspect ratio.
     *
     * If no size parameters are given, the taken image will be full-sized as determined by the device camera.
     *
     * The image capture view is user-configurable on Android.
     */
    function takePicture(desiredWidth?: number, desiredHeight?: number): Promise<any>;
}

/**
 * Allows adding images to- and fetching images from the system image gallery.
 *
 * Fuse represents images as frozen JavaScript Image objects, consisting of a path, a filename, a width and a height.
 * Once created or acquired, Images can be passed around to other APIs to use, fetch or alter their underlying data.
 * All images are temporary "scratch images" until storage has been specified either through publishing to the CameraRoll or other.
 *
 * Using this API on Android will request the `WRITE_EXTERNAL_STORAGE` and `READ_EXTERNAL_STORAGE` permissions.
 *
 * > **Note:** You need to add a package reference to `Fuse.CameraRoll` to use this API.
 *
 * ## Examples
 *
 * Requesting an image from the camera roll:
 * ```javascript
 *     var cameraRoll = require("FuseJS/CameraRoll");
 *
 *     cameraRoll.getImage()
 *         .then(function(image) {
 *             // Will be called if the user successfully selected an image.
 *         }, function(error) {
 *             // Will be called if the user aborted the selection or if an error occurred.
 *         });
 * ```
 * Taking a picture with the camera and adding it to the camera roll:
 * ```javascript
 *     var cameraRoll = require("FuseJS/CameraRoll");
 *     var camera = require("FuseJS/Camera");
 *
 *     camera.takePicture(640, 480)
 *         .then(function(image) {
 *             return cameraRoll.publishImage(image);
 *         })
 *         .then(function() {
 *             // Will be called if the image was successfully added to the camera roll.
 *         }, function(error) {
 *             // Will called if an error occurred.
 *         });
 * ```
 * > **Note**: You also need to add a package reference to `Fuse.Camera` for the above example to work.
 */
declare module "FuseJS/CameraRoll" {
    /**
     * Adds a copy of the Image instance to the system camera roll.
     *
     * On Android this is done by copying the image to the application's public image
     * storage directory and notifying the media scanner.
     *
     * On iOS this is done by uploading a copy of the image to an asset collection
     * named after the application within the system photo library.
     */
    function publishImage(image: any): void;

    /**
     * Checks if device has permissions to access the camera roll.
     */
    function checkPermissions(): boolean;

    /**
     * Requests acccess to photo gallery
     */
    function requestPermissions(): boolean;

    /**
     * Starts an OS-specific image picker view (user-configurable on Android).
     */
    function getImage(): Promise<any>;
}

/**
 * Provides an interface to the file system.
 * ```js
 *     var FileSystem = require("FuseJS/FileSystem");
 * ```
 * Using the asynchronous Promise based functions is recommended to keep your UI responsive,
 * although synchronous variants are also available if preferred.
 *
 * When saving files private to the application you can use the `dataDirectory` property
 * as a base path.
 *
 * ## Example
 *
 * This example writes a text to a file, and then reads it back:
 * ```js
 *     var FileSystem = require("FuseJS/FileSystem");
 *     var path = FileSystem.dataDirectory + "/" + "testfile.tmp";
 *
 *     FileSystem.writeTextToFile(path, "hello world")
 *         .then(function() {
 *             return FileSystem.readTextFromFile(path);
 *         })
 *         .then(function(text) {
 *             console.log("The read file content was: " + text);
 *         })
 *         .catch(function(error) {
 *             console.log("Unable to read file due to error:" + error);
 *         });
 * ```
 */
declare module "FuseJS/FileSystem" {
    interface AndroidPaths {
        externalCache: string;
        externalFiles: string;
        cache: string;
        files: string;
    }

    /**
     * An object containing paths only exposed on Android devices:
     *
     * * `externalCache` –  The directory acquired by calling `Context.getExternalCacheDir()`
     * * `externalFiles` –  The directory acquired by calling `Context.getExternalFilesDir(null)`
     * * `cache` –  The directory acquired by calling `Context.getCacheDir()`
     * * `files` –  The directory acquired by calling `Context.getFilesDir()`
     */
    const androidPaths: AndroidPaths;

    /**
     * A directory to put cached files.
     *
     * Note that files in this directory might be automatically removed when space is low, depending on platform.
     */
    const cacheDirectory: string;

    /**
     * A directory to put data files that are private to the application.
     *
     * * iOS - The Library directory for the application.
     * * Android - The directory acquired by calling `Context.getFilesDir()`
     * * Local preview - `<project dir>/build/Local/Preview/fs_data`
     *
     * Note that cleaning or rebuilding your project will delete this directory.
     */
    const dataDirectory: string;

    interface IosPaths {
        documents: string;
        library: string;
        caches: string;
        temp: string;
    }

    /**
     * An object containing paths only exposed on iOS devices:
     *
     * * `documents` –  Mapped to `NSDocumentDirectory`
     * * `library` –  Mapped to `NSLibraryDirectory`
     * * `caches` –  Mapped to `NSCachesDirectory`
     * * `temp` –  Mapped to `NSTemporaryDirectory`
     */
    const iosPaths: IosPaths;

    /**
     * Asynchronously appends a string to a UTF-8 encoded file.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.appendTextToFile(FileSystem.dataDirectory + "/" + "myfile.txt", "Hello buddy")
     *         .then(function() {
     *             console.log("Successful append");
     *         }, function(error) {
     *             console.log(error);
     *         });
     * ```
     */
    function appendTextToFile(filename: string, contents: string): Promise<void>;

    /**
     * Synchronously appends a string to a UTF-8 encoded file.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.appendTextToFileSync("myfile.txt", "Hello buddy");
     * ```
     */
    function appendTextToFileSync(filename: string, contents: string): void;

    /**
     * Asynchronously copies a file or directory recursively from source to destination path
     *
     * ## Example
     * ```js
     *     FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.writeTextToFile("to-be-copied.txt", "hello world")
     *         .then(function() {
     *             return FileSystem.copy("to-be-copied.txt", "destination-reached.txt");
     *         })
     *         .catch(function(err) {
     *             console.log("Unable to copy file");
     *         });
     * ```
     */
    function copy(source: string, destination: string): Promise<void>;

    /**
     * Synchronously copies a file or directory recursively from source to destination path
     *
     * ## Example
     * ```js
     *     FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.writeTextToFileSync("to-be-copied.txt", "hello world");
     *     FileSystem.copySync("to-be-copied.txt", "destination-reached.txt");
     * ```
     */
    function copySync(source: string, destination: string): void;

    /**
     * Asynchronously creates a directory.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.createDirectory(FileSystem.dataDirectory + "/" + "new-directory")
     *         .then(function() {
     *             console.log("Directory created!");
     *         }, function(error) {
     *             console.log("Error trying to create directory.");
     *         });
     * ```
     */
    function createDirectory(path: string): Promise<void>;

    /**
     * Synchronously creates a directory.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.createDirectory(FileSystem.dataDirectory + "/" + "new-directory");
     * ```
     */
    function createDirectorySync(path: string): void;

    /**
     * Asynchronously check if a file exists.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.exists("myfile.txt")
     *         .then(function(x) {
     *             console.log(x ? "it's there! =)" : "it's missing :/");
     *         }, function(error) {
     *             console.log("Unable to check if file exists");
     *         });
     * ```
     */
    function exists(path: string): Promise<boolean>;

    /**
     * Synchronously check if a file exists.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     console.log(FileSystem.existsSync("myfile.txt") ? "It's there!" : "It's missing :/");
     * ```
     */
    function existsSync(path: string): boolean;

    interface DirectoryInfo {
        exists: boolean;
        lastWriteTime: Date;
        lastAccessTime: Date;
    }

    /**
     * Asynchronously gets info about a directory.
     *
     * The returned object has the following properties:
     *
     * * `exists` –  a boolean value stating whether the directory exists or not.
     * * `lastWriteTime` –  A `Date` stating when directory was last changed
     * * `lastAccessTime` –  A `Date` stating when directory was accessed
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.createDirectorySync("some-dir");
     *     FileSystem.getDirectoryInfo("some-dir")
     *         .then(function(dirInfo) {
     *             console.log("Directory was modified on " + dirInfo.lastWriteTime);
     *         })
     *         .catch(function(error) {
     *             console.log("Failed to get directory info " + error);
     *         });
     * ```
     */
    function getDirectoryInfo(path: string): Promise<DirectoryInfo>;

    /**
     * Synchronously gets info about a directory.
     *
     * The returned object has the following properties:
     *
     * * `exists` -  A boolean value stating whether the directory exists
     * * `lastWriteTime` -  A `Date` stating when directory was last changed
     * * `lastAccessTime` -  A `Date` stating when directory was accessed
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.createDirectorySync("some-dir");
     *     var dirInfo = FileSystem.getDirectoryInfoSync("some-dir");
     *     console.log("file was modified on " + dirInfo.lastWriteTime);
     * ```
     */
    function getDirectoryInfoSync(path: string): DirectoryInfo;

    interface FileInfo {
        size: number;
        exists: boolean;
        lastWriteTime: Date;
        lastAccessTime: Date;
    }

    /**
     * Asynchronously gets info about a file.
     *
     * The returned object has the following properties:
     *
     * * `size` –  size of file
     * * `exists` –  a boolean value stating whether file exists
     * * `lastWriteTime` –  A `Date` stating when file was last changed
     * * `lastAccessTime` –  A `Date` stating when file was accessed
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.writeTextToFileSync("some-file.txt", "hello there");
     *     FileSystem.getFileInfo("some-file.txt")
     *         .then(function(fileInfo) {
     *             console.log("file was modified on " + fileInfo.lastWriteTime);
     *         })
     *         .catch(function(error) {
     *             "failed stat " + error
     *         });
     * ```
     */
    function getFileInfo(path: string): Promise<FileInfo>;

    /**
     * Synchronously gets info about a file.
     *
     * The returned object has the following properties:
     *
     * * `exists` –  a boolean value stating whether file exists
     * * `lastWriteTime` –  A `Date` stating when file was last changed
     * * `lastAccessTime` –  A `Date` stating when file was accessed
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.writeTextToFileSync("some-file.txt", "hello there");
     *     var fileInfo = FileSystem.getFileInfoSync("some-file.txt");
     *     console.log("file was modified on " + fileInfo.lastWriteTime);
     * ```
     */
    function getFileInfoSync(path: string): FileInfo;

    /**
     * Asynchronously list subdirectories in a directory.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.listDirectories(FileSystem.dataDirectory)
     *         .then(function(directories) {
     *             console.log("There are " + directories.length + " subdirectories in directory")
     *         }, function(error) {
     *             console.log("Unable to list subdirectories of directory: " + error);
     *         });
     * ```
     */
    function listDirectories(path: string): Promise<string[]>;

    /**
     * Synchronously list subdirectories in a directory.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     var directories = FileSystem.listDirectoriesSync(FileSystem.dataDirectory);
     *     console.log("There are " + directories.length + " subdirectories in directory");
     * ```
     */
    function listDirectoriesSync(path: string): string[];

    /**
     * Asynchronously lists both files and subdirectories in a directory.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.listEntries(FileSystem.dataDirectory)
     *         .then(function(entries) {
     *             console.log("There are " + entries.length + " entries in directory")
     *         }, function(error) {
     *             console.log("Unable to list entries in directory due to error " + error);
     *         });
     * ```
     */
    function listEntries(path: string): Promise<string[]>;

    /**
     * Synchronously lists both files and subdirectories in a directory.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     var entries = FileSystem.listEntriesSync(FileSystem.dataDirectory);
     *     console.log("There are " + entries.length + " entries in directory");
     * ```
     */
    function listEntriesSync(path: string): string[];

    /**
     * Asynchronously list files in directory.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.listFiles(FileSystem.dataDirectory)
     *         .then(function(files) {
     *             console.log("There are " + files.length + " files in directory")
     *         }, function(error) {
     *             console.log("Unable to list files in directory due to error " + error);
     *         });
     * ```
     */
    function listFiles(path: string): Promise<string[]>;

    /**
     * Synchronously list files in directory.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     var files = FileSystem.listFilesSync(FileSystem.dataDirectory);
     *     console.log("There are " + files.length + " files in directory");
     * ```
     */
    function listFilesSync(path: string): string[];

    /**
     * Asynchronously moves a file or directory from source to destination path
     *
     * ## Example
     * ```js
     *     FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.writeTextToFile("to-be-moved.txt", "hello world")
     *         .then(function() {
     *             return FileSystem.move("to-be-moved.txt", "destination-reached.txt");
     *         })
     *         .catch(function(err) {
     *             console.log("Unable to move file");
     *         });
     * ```
     */
    function move(source: string, destination: string): Promise<void>;

    /**
     * Synchronously moves a file or directory from source to destination path
     *
     * ## Example
     * ```js
     *     FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.writeTextToFileSync("to-be-moved.txt", "hello world");
     *     FileSystem.moveSync("to-be-moved.txt", "destination-reached.txt");
     * ```
     */
    function moveSync(source: string, destination: string): Promise<void>;

    /**
     * Asynchronously reads a file and returns a Promise of an ArrayBuffer with its contents.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.readBufferFromFile("myfile.txt")
     *         .then(function(contents) {
     *             console.log(contents);
     *         }, function(error) {
     *             console.log(error);
     *         });
     * ```
     */
    function readBufferFromFile(filename: string): Promise<ArrayBuffer>;

    /**
     * Synchronously reads a file and returns an ArrayBuffer with its contents.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     var data = FileSystem.readBufferFromFileSync("myfile.txt");
     * ```
     */
    function readBufferFromFileSync(filename: string): ArrayBuffer;

    /**
     * Asynchronously reads a file and returns a Promise of its contents.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.readTextFromFile("myfile.txt")
     *         .then(function(contents) {
     *             console.log(contents);
     *         }, function(error) {
     *             console.log(error);
     *         });
     * ```
     */
    function readTextFromFile(filename: string): Promise<string>;

    /**
     * Synchronously reads a file and returns its contents as a string.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     var content =  FileSystem.readTextFromFileSync(FileSystem.dataDirectory + "/" + "myfile.txt");
     *     console.log("The file contains " + content));
     * ```
     */
    function readTextFromFileSync(filename: string): string;

    /**
     * Asynchronously delete a file.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.remove("myfile.txt")
     *         .then(function() {
     *             console.log("Delete succeeded");
     *         }, function(error) {
     *             console.log("Unable to delete file");
     *         });
     * ```
     */
    function remove(path: string): Promise<void>;

    /**
     * Synchronously delete a file.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.removeSync("myfile.txt");
     * ```
     */
    function removeSync(path: string): void;

    /**
     * Asynchronously writes an `ArrayBuffer` to a file.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     var data = new ArrayBuffer(4);
     *     var view = new Int32Array(data);
     *     view[0] = 0x1337;
     *
     *     FileSystem.writeBufferToFile(FileSystem.dataDirectory + "/" + "myfile.txt", data)
     *         .then(function() {
     *             console.log("Successful write");
     *         }, function(error) {
     *             console.log(error);
     *         });
     * ```
     */
    function writeBufferToFile(filename: string, data: ArrayBuffer): Promise<void>;

    /**
     * Synchronously writes an `ArrayBuffer` to a file.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     var data = new ArrayBuffer(4);
     *     var view = new Int32Array(data);
     *     view[0] = 0x1337;
     *
     *     FileSystem.writeBufferToFileSync(FileSystem.dataDirectory + "/" + "myfile.txt", data);
     * ```
     */
    function writeBufferToFileSync(filename: string, data: ArrayBuffer): void;

    /**
     * Asynchronously writes a string to a UTF-8 encoded file.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.writeTextToFile(FileSystem.dataDirectory + "/" + "myfile.txt", "Hello buddy")
     *         .then(function() {
     *             console.log("Successful write");
     *         }, function(error) {
     *             console.log(error);
     *         });
     * ```
     */
    function writeTextToFile(filename: string, text: string): Promise<void>;

    /**
     * Synchronously writes a string to a UTF-8 encoded file.
     *
     * ## Example
     * ```js
     *     var FileSystem = require("FuseJS/FileSystem");
     *
     *     FileSystem.writeTextToFileSync("myfile.txt", "Hello buddy");
     * ```
     */
    function writeTextToFileSync(filename: string, text: string): void;
}

/**
 * Provides geolocation services.
 *
 * Using geolocation services requires device authorization. Including the `Fuse.GeoLocation` package
 * in your project will trigger a prompt for this authorization when the app is launched.
 *
 * Use [startListening](api:fuse/geolocation/geolocation/startlistening_bbef95e2.json)
 * to get continual location updates. Use
 * [location](api:fuse/geolocation/geolocation/getlocation.json)
 * or [getLocation](api:fuse/geolocation/geolocation/getlocationasync_95a738ba.json) for one-time location requests.
 *
 * You need to add a reference to `"Fuse.GeoLocation"` in your project file to use this feature.
 *
 * This module is an @EventEmitter, so the methods from @EventEmitter can be used to listen to events.
 *
 * ## Example
 *
 * The following example shows how the different modes of operation can be used:
 * ```xml
 *     <JavaScript>
 *         var Observable = require("FuseJS/Observable");
 *         var GeoLocation = require("FuseJS/GeoLocation");
 *
 *         // Immediate
 *         var immediateLocation = JSON.stringify(GeoLocation.location);
 *
 *         // Timeout
 *         var timeoutLocation = Observable("");
 *         var timeoutMs = 5000;
 *         GeoLocation.getLocation(timeoutMs).then(function(location) {
 *             timeoutLocation.value = JSON.stringify(location);
 *         }).catch(function(fail) {
 *             console.log("getLocation fail " + fail);
 *         });
 *
 *         // Continuous
 *         var continuousLocation = GeoLocation.observe("changed").map(JSON.stringify);
 *
 *         GeoLocation.on("error", function(fail) {
 *             console.log("GeoLocation error " + fail);
 *         });
 *
 *         function startContinuousListener() {
 *             var intervalMs = 1000;
 *             var desiredAccuracyInMeters = 10;
 *             GeoLocation.startListening(intervalMs, desiredAccuracyInMeters);
 *         }
 *
 *         function stopContinuousListener() {
 *             GeoLocation.stopListening();
 *         }
 *
 *         module.exports = {
 *             immediateLocation: immediateLocation,
 *             timeoutLocation: timeoutLocation,
 *             continuousLocation: continuousLocation,
 *
 *             startContinuousListener: startContinuousListener,
 *             stopContinuousListener: stopContinuousListener
 *         };
 *     </JavaScript>
 *
 *     <StackPanel>
 *         <Text>Immediate:</Text>
 *         <Text Value="{immediateLocation}" />
 *
 *         <Text>Timeout:</Text>
 *         <Text Value="{timeoutLocation}" />
 *
 *         <Text>Continuous:</Text>
 *         <Text Value="{continuousLocation}" />
 *
 *         <Button Text="Start continuous listener" Clicked="{startContinuousListener}" />
 *         <Button Text="Stop continuous listener" Clicked="{stopContinuousListener}" />
 *     </StackPanel>
 * ```xml
 * In the above example we're using the @EventEmitter `observe` method to create an @Observable from the
 * `"changed"` event. We can also listen to changes by using the `on` method, as follows:
 *
 *     GeoLocation.on("changed", function(location) { ... })
 *
 * Locations returned by this module are JavaScript objects of the following form:
 * ```json
 *     {
 *         latitude: a number measured in decimal degrees,
 *         longitude: a number measured in decimal degrees,
 *         accuracy: a number measured in meters
 *     }
 * ```
 * To handle errors from GeoLocation we can listen to the `"error"` event, as follows:
 *
 *     GeoLocation.on("error", function(err) { ... })
 */
declare module "FuseJS/GeoLocation" {
    interface Location {
        altitude: number;
        latitude: number;
        longitude: number;
        accuracy: number;
        speed: number;
    }

    /**
     * The last known location.
     *
     * The returned object is of the following form:
     * ```json
     *     {
     *         altitude: altitude measured in meters,
     *         latitude: a number measured in decimal degrees,
     *         longitude: a number measured in decimal degrees,
     *         accuracy: a number measured in meters,
     *         speed: speed measured in meters per second
     *     }
     * ```
     * See [the GeoLocation module](api:fuse/geolocation/geolocation) for an example.
     */
    const location: Location;

    /**
     * The type of authorization request to make to the user.
     *
     * This property currently only affects iOS. It should be
     * set before using the rest of the GeoLocation API.
     *
     * Setting this property to `1`, which is also the
     * default, for example as follows:
     * ```json
     *     var GeoLocation = require("FuseJS/GeoLocation");
     *     GeoLocation.authorizationRequest = 1;
     * ```
     * Means that the app should request permission from the
     * user to use location services while the app is in the
     * foreground. Setting it to `2`, as follows:
     * ```json
     *     GeoLocation.authorizationRequest = 2;
     * ```
     * Means that the app should request permission from the
     * user to use location services whenever the app is
     * running.
     */
    const authorizationRequest: number;

    type Event = "changed" |
                 "error";

    /**
     * Registers a function to be called when one of the following events occur.
     *
     * * `"changed(location)"` - Raised when the location changes.
     * * `"error(error)"` - Raised when an error occurs.
     */
    function on(event: Event, callback: (arg: any) => void): void;

    /**
     * Returns the authorization status of GeoLocation
     */
    function GetAuthorizationStatus(): any;

    /**
     * Gets the current location as a promise.
     *
     * Can optionally be passed a timeout (in milliseconds)
     * that the promise should be rejected after.
     *
     * If successful, the promise is resolved with an object of the following form:
     * ```json
     *     {
     *         altitude: altitude measured in meters,
     *         latitude: a number measured in decimal degrees,
     *         longitude: a number measured in decimal degrees,
     *         accuracy: a number measured in meters,
     *         speed: speed measured in meters per second
     *     }
     * ```
     * See [the GeoLocation module](api:fuse/geolocation/geolocation) for an example.
     */
    function getLocation(timeout: number): Location;

    /**
     * Returns whether or not the device has Geolocation enabled.
     */
    function isLocationEnabled(): boolean;

    /**
     * Starts the GeoLocation listening service.
     *
     * [onChanged](api:fuse/geolocation/geolocation/locationchanged_adbb1cba.json)
     * events will be generated as the location changes.
     *
     * Use [stopListening](api:fuse/geolocation/geolocation/stoplistening_bbef95e2.json) to stop the service.
     *
     * The parameters here are desired values; the actual interval and accuracy are dependent on the
     * device.
     *
     * See [the GeoLocation module](api:fuse/geolocation/geolocation) for an example.
     */
    function startListening(minimumReportInterval: number, desiredAccuracy: number): void;

    /**
     * Stops the GeoLocation listening service.
     *
     * See [the GeoLocation module](api:fuse/geolocation/geolocation) for an example.
     */
    function stopListening(): void;
}

/**
 * Utility methods for common Image manipulation.
 *
 * > To use this module, add `Fuse.ImageTools` to your package references in your `.unoproj`.
 *
 * Fuse represents images as frozen JavaScript Image objects, consisting of a path, a filename, a width and a height.
 * Once created or acquired, Images can be passed around to other APIs to use, fetch or alter their underlying data.
 * All images are temporary "scratch images" until storage has been specified either through publishing to the CameraRoll or other.
 *
 * On Android using this API will request the WRITE_EXTERNAL_STORAGE and READ_EXTERNAL_STORAGE permissions.
 *
 * ## Example
 * ```xml
 *     <JavaScript>
 *         var ImageTools = require("FuseJS/ImageTools");
 *         var Observable = require("FuseJS/Observable");
 *
 *         var imagePath = Observable();
 *         var base64Image =    "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPAQMAAAABGAcJAAAABlBMVEX9//wAAQATpOzaAAAAH0l" +
 *                             "EQVQI12MAAoMHIFLAAYSEwIiJgYGZASrI38AAAwBamgM5VF7xgwAAAABJRU5ErkJggg==";
 *         ImageTools.getImageFromBase64(base64Image)
 *         .then(function(image) {
 *             imagePath.value = image.path;
 *         });
 *
 *         module.exports = { test: new Date().toString(), image: imagePath };
 *     </JavaScript>
 *     <Image File="{image}" />
 * ```
 */
declare module "FuseJS/ImageTools" {
    /**
     * Encodes the given image as a base64 string.
     *
     * ## Example
     * ```js
     *     // Here we assume that we have an existing `image` object
     *     var ImageTools = require("FuseJS/ImageTools");
     *     ImageTools.getBase64FromImage(image)
     *         .then(function(base64Image) { console.log("The base64 encoded image is \"" + base64Image + "\""); });
     * ```
     */
    function getBase64FromImage(image: any): Promise<string>;

    /**
     * Retrieves the underlying image data for an image as an ArrayBuffer.
     *
     * ## Example
     * ```js
     *     // Here image is expected to be an `Image` object
     *     var ImageTools = require("FuseJS/ImageTools");
     *     ImageTools.getBufferFromImage(image)
     *         .then(function(buf) { console.log("Image contains " + buf.byteLength + " bytes"); });
     * ```
     */
    function getBufferFromImage(image: any): Promise<ArrayBuffer>;

    /**
     * Crops the supplied `image`, and returns a Promise of the transformed Image.
     *
     * The `options` parameter must be an object with one or more of the following properties defined:
     *
     * * `x` - X offset for cropped image, from left
     * * `y` - Y offset for cropped image, from top
     * * `width` - Width of cropped image
     * * `height` - Height of cropped image
     * * `performInPlace` - Boolean value determining whether the existing image will replaced
     *
     * ## Example
     * ```js
     *     // Here we assume that we have an existing image variable `originalImage`
     *     var ImageTools = require("FuseJS/ImageTools");
     *
     *     var options = {
     *         width: 10, // Width of cropped image
     *         height: 10 // Height of cropped image
     *     };
     *
     *     ImageTools.crop(originalImage, options)
     *         .then(function(newImage) { console.log("Path of cropped image is " + newImage.path); });
     * ```
     */
    function crop(image: any, options: any): Promise<any>;

    /**
     * Takes base64 string encoded image data and returns a Promise of an Image.
     *
     * ## Example
     * ```js
     *     // Here we assume that someBase64ImageString contains a base-64 encoded image
     *     var ImageTools = require("FuseJS/ImageTools");
     *     ImageTools.getImageFromBase64(someBase64ImageString);
     *         .then(function(image) {
     *             console.log("Scratch path of image is " + image.path);
     *         });
     * ```
     */
    function getImageFromBase64(base64: string): Promise<any>;

    /**
     * Creates a new temporary image file from an ArrayBuffer of image data.
     *
     * ## Example
     * ```js
     *     var ImageTools = require("FuseJS/ImageTools");
     *     ImageTools.getImageFromBuffer(imageData).
     *         then(function (image) { console.log("Scratch image path is: " + image.path); });
     * ```
     */
    function getImageFromBuffer(imageData: ArrayBuffer): Promise<any>;

    /**
     * Resizes an image using the options provided, and returns a Promise of the transformed Image.
     *
     * The `options` parameter must be an object with one or more of the following properties defined:
     *
     * * `desiredWidth` - The new width in pixels
     * * `desiredHeight` - The new height in pixels
     * * `mode` - The resizing mode, which can be:
     *   - `ImageTools.IGNORE_ASPECT` - The image is resized exactly to the desired width and height. This is the default.
     *   - `ImageTools.KEEP_ASPECT`- The image is resized to within the closest size possible to the desired size while still maintaining the original aspect ratio.
     *   - `ImageTools.SCALE_AND_CROP` - The image is first scaled and centered while maintaining aspect to the closest edge of the desired bounds, then cropped according to the Crop rule. This allows you to make an aspect correct square portrait out of a landscape shot, for instance.
     * * `performInPlace` - Boolean value determining whether the existing image will replaced
     *
     * ## Example
     * ```js
     *     // Here we assume that we have an existing image variable `originalImage`
     *     var ImageTools = require("FuseJS/ImageTools");
     *
     *     var options = {
     *         mode: ImageTools.IGNORE_ASPECT,
     *         desiredWidth: 320, //The desired width in pixels
     *         desiredHeight: 240 //The desired height in pixels
     *     };
     *
     *     ImageTools.resize(originalImage, options)
     *         .then(function(newImage) { console.log("Path of resized image is " + newImage.path); });
     * ```
     */
    function resize(image: any, options: any): Promise<any>;
}

/**
 * Create, schedule and react to notifications created locally
 *
 * Sometimes you need to alert your user to an event in your app even when your app is not running in the foreground. For this, most mobile devices have some concept of Notifications. This piece of documentation covers 'Local Notifications', which are notifications scheduled from the app itself. 'Push Notifications' are notifications sent from a server elsewhere and are covered [here](api:fuse/pushnotifications/push).
 *
 * As with many of our bindings over OS features we like to start with a light API and build up. We are very interested in comments & requests, so do drop by the forums and let us know.
 *
 * ## Getting Set Up
 *
 * Include the Fuse local notification library by adding the following to your `.unoproj` file
 * ```json
 *     "Packages": [
 *         ...
 *         "Fuse.LocalNotifications",
 *         ...
 *     ],
 * ```
 * This is enough to start using this feature in your apps. Let's look at that now.
 *
 * ## App Example
 *
 * This is a full Fuse app that uses Local Notifications:
 * ```xml
 *     <App>
 *         <JavaScript>
 *             var LocalNotify = require("FuseJS/LocalNotifications");
 *
 *             LocalNotify.on("receivedMessage", function(payload) {
 *                 console.log("Received Local Notification: " + payload);
 *                 LocalNotify.clearAllNotifications();
 *             });
 *
 *             function sendLater() {
 *                 LocalNotify.later(4, "Finally!", "4 seconds is a long time", "hmm?", true);
 *             }
 *
 *             function sendNow() {
 *                 LocalNotify.now("Boom!", "Just like that", "payload", true);
 *             }
 *
 *             module.exports = {
 *                 sendNow: sendNow,
 *                 sendLater: sendLater
 *             };
 *         </JavaScript>
 *         <DockPanel>
 *             <TopFrameBackground DockPanel.Dock="Top" />
 *             <ScrollView>
 *                 <StackPanel>
 *                     <Button Clicked="{sendNow}" Text="Send notification now" Height="60"/>
 *                     <Button Clicked="{sendLater}" Text="Send notification in 4 seconds" Height="60"/>
 *                 </StackPanel>
 *             </ScrollView>
 *             <BottomBarBackground DockPanel.Dock="Bottom" />
 *         </DockPanel>
 *     </App>
 * ```
 * Let's break down what is happening here.
 *
 * ## How it works
 *
 * We will skip the `module.exports` and stuff inside the `DockPanel`, as that is better explained in other guides. Let's instead go through the JS.
 *
 * After `require`ing our module like normal, we set up a function which will deliver a notification 4 seconds in the future.
 * ```js
 *     function sendLater() {
 *         LocalNotify.later(4, "Finally!", "4 seconds is a long time", "hmm?", true);
 *     }
 * ```
 * The `later` function take the following parameters:
 *
 * - `secondsFromNow`: How long in seconds until the notification fires
 * - `title`: the `string` which will be the title in the notification when it shows in the device's notification bar
 * - `body`: the `string` which will be the body of the notification when it shows in the device's notification bar
 * - `payload`: a string which is not shown in the notification itself, but will be present in the callback.
 * - `sound`: a `bool` specifying whether or not the device should make the default notification sound when it is shown in the notification bar
 * - `badgeNumber`: An optional parameter that is only used on iOS, which puts a badge number against the apps icon. This is often used for showing the quantity of 'things' that need the user's attention. For example an email app could show the number of unread emails.
 * ```js
 *     function sendNow() {
 *         LocalNotify.now("Boom!", "Just like that", "payload", true);
 *     }
 * ```
 * The `now` function is almost identical to the `later` function, except that it doesnt have the `secondsFromNow` parameter.
 *
 * One last thing to note about both `now` and `later`, is that they will not deliver a notification to the user if the app is open. Instead, they will trigger the `receivedMessage` event silently.
 *
 * Finally, we set up the function that will be called whenever we get a notification, by using the @EventEmitter `on` method to register it.
 * ```js
 *     LocalNotify.on("receivedMessage", function(payload) {
 *         console.log("Received Local Notification: " + payload);
 *         LocalNotify.clearAllNotifications();
 *         LocalNotify.clearBadgeNumber();
 *     });
 * ```
 * This function is called whenever a notification is delivered while the app is open, or when the app is started from a notification the user has selected.
 *
 * The `payload` will be a string in JSON format containing the following keys:
 * - `'title'`: the notification's title as a `string`
 * - `'body'`: the body text of the notification as a `string`
 * - `'payload'`: the `string` of data that was sent with the notification.
 *
 * `clearAllNotifications()` clears all notifications made by the app that have already been delivered. This can be used to remove similar notifications if one is clicked.
 *
 * Last, but not least, `clearBadgeNumber()` clears the little number next to the app icon on the home screen, showing the amount of notifications the app has.
 *
 * ## Lifecyle Behavior
 *
 * How your notification is treated by the OS depends on the state of the app. If the app is `Interactive`, the notification does not appear, and is instead delivered straight to your running app. If it is not interactive, the OS will create a notification based on the parameters you gave to the `later` or `not` functions. `Interactive` not only means that your app is in the `Foreground`, but that it also is not being obscured by other windows. One example of being in the `Foreground` and not `Interactive`, is when you swipe the status-bar to open the 'Notification Center/Drawer'.
 *
 * You can try this with the example app above. Hit the `Send notification in 4 seconds` button, and open the 'Notification Center/Drawer'
 *
 * ## Remarks
 *
 * This module is an @EventEmitter, so the methods from @EventEmitter can be used to listen to events.
 *
 * You need to add a reference to `"Fuse.LocalNotifications"` in your project file to use this feature.
 */
declare module "FuseJS/LocalNotifications" {
    type Event = "receivedMessage";

    /**
     * Registers a function to be called when one of the following events occur.
     *
     * * `"receivedMessage"` -
     */
    function on(event: Event, callback: () => void): void;

    /**
     * Dismisses all currently active notifications created by our app.
     */
    function clearAllNotifications(): void;

    /**
     * Clears the badge number shown on the iOS home screen.
     */
    function clearBadgeNumber(): void;

    /**
     * Displays a notification to the user after the time specified by `secondsFromNow` has passed.
     */
    function later(secondsFromNow: number, title: string, body: string, payload: any, sound: boolean, badgeNumber?: any): void;

    /**
     * Instantly displays a notification to the user.
     */
    function now(title: string, body: string, payload: any, sound: boolean, badgeNumber?: any): void;
}

/**
 * Handles push notification from messaging services.
 *
 * This module currently supports APNS (Apple Push Notification Service) and GCM (Google Cloud Messaging).
 *
 * Fuse provides support for push-notifications from Firebase Cloud Messaging (FCM) and Apple' Push Notification Service (APNS).
 *
 * We have opted for a lightweight consistent interface across iOS and Android which we can easily expand as needed.
 *
 * > We are very interested in comments & requests you have on what we have so far so do drop by the forums and let us know.
 *
 * ## Setting up the client side
 *
 * ### Step 1.
 *
 * Include the Fuse push notification library by adding the following to your `.unoproj` file
 * ```json
 *     "Packages": [
 *         ...
 *         "Fuse.PushNotifications",
 *         ...
 *     ],
 * ```
 * ### Step 2. (Only for Android)
 *
 * Google notifications require a little extra info.
 *
 * Add the following to you `.unoproj`
 * ```json
 *     "Android": {
 *         ...
 *         "GooglePlay": {
 *             "SenderID": "111781901112"
 *         }
 *         ...
 *     },
 * ```
 * The `SenderID` is the sender ID from the [Firebase Console](https://console.firebase.google.com).
 * If you don't yet have a project set up please see the [Android setup](#android-setup) section later in this document.
 *
 * ## How this behaves in your app
 *
 * Referencing `Fuse.PushNotifications` will do the the following:
 *
 * ### Both Platforms
 *
 * - You get a callback telling you if the registration succeeded or failed.
 * - The succeeded callback will contain your unique registration id (also called a token in iOS docs)
 * - All future received push notifications will fire a callback containing the JSON of the notification.
 *
 * All three callbacks mentioned are available in JavaScript and Uno.
 *
 * ### Android specific
 *
 * - Your SenderID is added to the project's `Manifest.xml` file along with some other plumbing
 * - When your app starts the app registers with the `GCM` service.
 *
 * ### iOS specific
 *
 * - When your app starts it registers with APNS. As all access is controlled through Apple's certificate system there is no extra info to provide (we will mention server side a bit later)
 *
 * If you wish to disable auto-registration you can place the following in your unoproj file:
 * ```json
 *     "iOS": {
 *         "PushNotifications": {
 *             "RegisterOnLaunch": false
 *         }
 *     },
 * ```
 * You must then register for push notifications by calling `register()` from JS. This option is useful as when the notifications are registered the OS may ask the user for permission to use push notifications and this may be undesirable on launch.
 *
 * ## Using the API from JavaScript
 *
 * Integrating with notifications from JavaScript is simple. Here is an example that just logs when the callbacks fire:
 * ```xml
 *     <JavaScript>
 *         var push = require("FuseJS/Push");
 *
 *         push.on("registrationSucceeded", function(regID) {
 *             console.log("Reg Succeeded: " + regID);
 *         });
 *
 *         push.on("error", function(reason) {
 *             console.log("Reg Failed: " + reason);
 *         });
 *
 *         push.on("receivedMessage", function(payload) {
 *             console.log("Recieved Push Notification: " + payload);
 *         });
 *     </JavaScript>
 * ```
 * Here we're using the @EventEmitter `on` method to register our functions with the different events.
 * In a real app we should send our `registration ID` to our server when `registrationSucceeded` is triggered.
 *
 * ## Server Side
 *
 * When we have our client all set up and ready to go we move on to the backend. For this we are required to jump through the hoops provided by Apple and Google.
 *
 * See below for the following guides on how to do this for specific platforms:
 *
 * - [iOS Setup](#ios-setup)
 * - [Android Setup](#android-setup)
 *
 * ## The Notification
 *
 * We support push notifications in JSON format. When a notification arrives one of two things will happen:
 *
 * - If our app has focus, the callback is called right away with the full JSON payload
 * - If our app doesn't have focus, (and our JSON contains the correct data) we will add a system notification to the notification bar (called the Notification Center in iOS). When the user clicks the notification in the drop down then our app is launched and the notification is delivered.
 *
 * Apple and Google's APIs define how the data in the payload is used to populate the system notification, however we have normalized it a little.
 *
 * For iOS we'll just include an `aps` entry in the notification's JSON, like so:
 * ```json
 *     'aps': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server'
 *         }
 *     },
 * ```
 * And 'title' and 'body' will be used as the title and body of the system notification.
 *
 * For Android we can use exactly the same `'aps'` entry or the alternatively the following:
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server'
 *         }
 *     },
 * ```
 * The `notification` entry is the standard Google way of doing this but we felt that it wouldn't hurt to support the Apple way too.
 *
 * > The current implementation only guarantees the `title` and `body` entries will work. We also always use your app's icon as the notification icon. This is an area we will extend as Fuse matures. If you have specific requests, be sure to let us know!
 *
 * ## Message size limits
 *
 * Google and Apple has different limits on the size of push notifications.
 *
 * - Google limits to 4096 bytes
 * - Apple limits to 2048 bytes on iOS 8 and up but only 256 bytes on all earlier versions
 *
 * ## Additional Android Push Notification Features
 *
 * Since Android 8+ (Oreo or API 26), it is mandatory to define and assign a channel to every notification.
 *
 * We have defined a default channel (named "App") to be assigned to notifications if they aren't already assigned a channel, so you don't need to define one but if you do want to customise it, read on.
 *
 * NB! Once a channel is created, you CANNOT change its properties later.
 *
 * Apart from the Notification Channel feature discussed above, here is a list of the other android features implemented thus far:
 *
 * - Notification Sound
 * - Notification Color
 * - Notification Priority
 * - Notification Category
 * - Notification Lockscreen Visibility
 *
 * Android 8+
 * - Notification Channel
 * - Nofitication Channel Group
 * - Notification Channel Importance
 * - Notification Channel Lockscreen Visibility
 * - Notification Channel Light Color
 * - Notification Channel Sound
 * - Notification Channel Vibration
 * - Notification Channel Show Badge
 * - Notification Badge Number
 * - Notification Badge Icon Type
 *
 * We'll show you how to implement them here in fuse but read more about each feature [here](https://developer.android.com/guide/topics/ui/notifiers/notifications).
 *
 * #### Notification Sound - Value - default
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'sound': 'default'
 *         }
 *     },
 * ```
 *
 * #### Notification Color - Values - #RRGGBB | #AARRGGBB
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'color': '#8811FF'
 *         }
 *     },
 * ```
 *
 * #### Notification Priority - Values - high | low | max | min
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationPriority': 'high'
 *         }
 *     },
 * ```
 *
 * #### Notification Category - Values - alarm | reminder | event | call | message | email | promo | recommendation | social | error | progress | service | status | system | transport
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationCategory': 'social'
 *         }
 *     },
 * ```
 *
 * #### Notification Lockscreen Visibility - Values - public | secret | private
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationLockscreenVisibility': 'secret'
 *         }
 *     },
 * ```
 *
 * #### Notification Channel
 *
 * Notification Channel and a Notification Channel Group:
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationChannelGroupId': 'sports',
 *             'notificationChannelGroupName': 'Sports',
 *             'notificationChannelId': 'sports_football_highlights',
 *             'notificationChannelName': 'Football Highlights',
 *             'notificationChannelDescription': 'Video commentary once a week'
 *         }
 *     },
 * ```
 * Notification Channel Importance - Values - urgent | high | medium | low | none
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationChannelGroupId': 'sports',
 *             'notificationChannelGroupName': 'Sports',
 *             'notificationChannelId': 'sports_basketball_highlights',
 *             'notificationChannelName': 'Basketball Highlights',
 *             'notificationChannelDescription': 'Video commentary once a week',
 *             'notificationChannelImportance': 'urgent',
 *
 *         }
 *     },
 * ```
 *
 * Notification Channel Lockscreen Visibility - Values - public | secret | private
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationChannelLockscreenVisibility': 'private'
 *         }
 *     },
 * ```
 *
 * Notification Channel Light Color - Values - #RRGGBB
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationChannelLightColor': '#1188FF'
 *         }
 *     },
 * ```
 *
 * Notification Channel Sound - Values - true | false
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationChannelIsSoundOn': 'true'
 *         }
 *     },
 * ```
 *
 * Notification Channel Vibration - Values - true | false
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationChannelIsVibrationOn': 'true'
 *         }
 *     },
 * ```
 *
 * Notification Channel Show Badge - Values - true | false
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationChannelIsShowBadgeOn': 'true'
 *         }
 *     },
 * ```
 *
 * #### Notification Badge
 *
 * Notification Channel Badge Number
 * ```json
 *    'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationBadgeNumber': '23'
 *         }
 *     },
 * ```
 *
 * Notification Channel Badge Icon Type - Values - none | small | large
 * ```json
 *     'notification': {
 *         alert: {
 *             'title': 'Well would ya look at that!',
 *             'body': 'Hello from the server',
 *             'notificationBadgeIconType': 'small'
 *         }
 *     },
 * ```
 *
 * #### Notification Uno Project Configurations
 *
 * The following notification settings can be set via the `.unoproj` settings:
 * ```json
 *     "Android": {
 *         ...
 *         "Notification": {
 *             "DefaultChannelGroupId": "default_group",
 *             "DefaultChannelGroupName": "Categories",
 *             "DefaultChannelId": "default_channel",
 *             "DefaultChannelName": "App",
 *             "DefaultChannelDescription": "",
 *             "DefaultChannelImportance": "high",
 *             "DefaultChannelLightColor": "#FF2C37",
 *             "NotificationChannelLockscreenVisibility": "secret",
 *             "NotificationChannelIsSoundOn": true,
 *             "NotificationChannelIsShowBadgeOn": true,
 *             "NotificationChannelIsVibrationOn": true
 *         }
 *         ...
 *     },
 * ```
 *
 * Note: notification payload settings will always override the notification settings from `.unoproj`.
 * NB! Once a channel is created, you CANNOT change its properties later.
 *
 * ## Remarks
 *
 * This module is an @EventEmitter, so the methods from @EventEmitter can be used to listen to events.
 *
 * You need to add a reference to `Fuse.PushNotifications` in your project file to use this feature.
 *
 * ## Android setup
 * This section covers how to set up Firebase Push Notifications to the point that you can send test messages to a Fuse App from the Firebase console.
 *
 * ### Registering the Sender ID
 *
 * - Open the [Firebase Console](https://console.firebase.google.com)
 * - Select your project or create one if you haven't already
 * - Click the little cogwheel button at the top of the sidebar, and press "Project settings"
 * - Navigate to the "Cloud Messaging" tab
 * - Copy the "Sender ID" into your `.unoproj` like this:
 * ```json
 *         "Android": {
 *             "GooglePlay": {
 *                 "SenderID": "<Sender ID goes here>"
 *             }
 *         }
 * ```
 * ### Registering the Android app
 *
 * To enable Firebase Cloud Messaging, you need to register an Android app with your Firebase project.
 * If you haven't already registered an Android app, follow these steps:
 *
 * - From the settings page, click the button to add a new Android app to the project
 * - A dialog will pop up, prompting you for a package name (the other fields are optional).
 *     By default, this will be `com.apps.<yourappnameinlowercase>`.
 *     However, it is recommended to set your own:
 * ```json
 *         "Android": {
 *             "Package": "com.mycompany.myapp",
 *         }
 * ```
 * - After adding the Android app, you will be prompted to download a `google-services.json` file. Download and copy it to the root of your project.
 * - Add the following file to tell fuse to copy google-services.json to your android app folder:
 *
 * Android.uxl
 *
 * ```xml
 * <Extensions Backend="CPlusPlus" Condition="Android">
 *     <CopyFile Condition="Android" Name="google-services.json" TargetName="app/google-services.json" />
 * </Extensions>
 * ```
 *
 * ### Sending notifications
 *
 * After rebuilding your project with the new settings, you should be ready to send and receive push notifications.
 *
 * > **Note:** Fuse currently only supports `data` type messages. See [here for details on messages types](https://firebase.google.com/docs/cloud-messaging/concept-options#data_messages) & [this forum post](https://forums.fusetools.com/t/push-notificacions-with-google-firebase-notifications/2910/16) for more information on how we will fix this in future.
 * > Sadly this means you currently can't use the Firebase Console to send test notifications (they will appear in the notification bar but will fail to reach JS).
 * > See the example below for an example of how to send messages to a Fuse app.
 *
 * When your app starts, the `registrationSucceeded` event will be triggered and you will be given the `regID`
 * This, along with your FCM Server key, are the details that is needed to send that app a notification.
 *
 * Your server key can be found under the "Cloud Messaging" tab of the Project Settings page (where you obtained your Sender ID).
 *
 * Here some example Fuse code for sending your app a notification.
 * ```xml
 *     <JavaScript>
 *         var API_ACCESS_KEY = '----HARDCODED API KEY----';
 *         var regID = '----HARDCODED REG ID FROM THE APP YOU ARE SENDING TO----';
 *
 *         module.exports.send = function() {
 *             fetch('https://android.googleapis.com/gcm/send', {
 *                 method: 'post',
 *                 headers: {
 *                     'Authorization': 'key=' + API_ACCESS_KEY,
 *                     'Content-Type': 'application/json'
 *                 },
 *                 body: JSON.stringify({
 *                     registration_ids: [regID],
 *                     data: {
 *                         notification: {
 *                             alert: {
 *                                 title: 'Well would ya look at that!',
 *                                 body: 'Hello from some other app'
 *                             }
 *                         },
 *                         payload: 'anything you like'
 *                     }
 *                 })
 *             }).then(function(response) {
 *                 console.log(JSON.stringify(response));
 *             }, function(error) {
 *                 console.log(error);
 *             });
 *         }
 *     </JavaScript>
 * ```
 * Whilst hardcoding the RegID is clearly not a good idea, it serves the purpose for this simple test.
 *
 * ## iOS setup
 * This section covers how to set up a iOS Push Notifications to the point that you can send messages to a Fuse App.
 *
 * ### Certifying your app for ACS
 *
 * To do this you need an SSL certificate for your app.
 *
 * - Go to the [Apple Dev Center](https://developer.apple.com/account/overview.action)
 * - Go to the Certificates Section for iOS apps
 * - In the link bar on the left, under the `Identifiers` section click `App IDs`
 * - Click the `+` icon in the top right to create a new App ID
 * - Fill in the details, you cant use push notification with a `Wildcard App ID` so pick `Explicit App ID` and check in XCode for the app's `Bundle ID`
 * - Under `App Services` enable Push notifications (and anything else you need)
 * - Click `Continue` and confirm the certificate choice you made.
 *
 * ### Syncing XCode
 *
 * Your app is now authenticated for Push notifications. Be sure to resync your profiles in XCode before re-building your app.
 * To do this:
 * - Open XCode
 * - In the menu-bar choose `XCode`->`Preferences`
 * - In the Preferences window view the `Accounts` tab
 * - In the `Accounts` tab click `View Details` for the relevant Apple ID
 * - Click the small refresh button in the bottom left of the `View Details` window
 *
 * ### Sending Push Notifications to iOS from OSX
 *
 * For simple testing you may find that setting up a server is a bit of an overkill. To this end we recommend [NWPusher](https://github.com/noodlewerk/NWPusher). Download the binary [here](https://github.com/noodlewerk/NWPusher/releases/tag/0.6.3) and then follow the following sections from the README
 *
 * - `Getting started`
 * - `Certificate`
 * - Instead of reading the `Device Token` section simply add the example from above to your UX file
 * - Finally, follow the `Push from OS X` Section
 *
 * Done, you should now be pushing notifications from OSX to iOS.
 */
declare module "FuseJS/Push" {
    type Event = "receivedMessage" |
                 "error" |
                 "registrationSucceeded";

    /**
     * Registers a function to be called when one of the following events occur.
     *
     * * `"receivedMessage"` - Triggered when your app receives a notification.
     * * `"error"` - Called if your app fails to register with the backend.
     * * `"registrationSucceeded"` - Triggered when your app registers with the APNS or GCM backend.
     */
    function on(event: Event, callback: () => void): void;

    /**
     * Cancels all previously shown notifications.
     */
    function clearAllNotifications(): void;

    /**
     * Clears the badge number shown on the iOS home screen.
     *
     * Has no effects on other platforms.
     */
    function clearBadgeNumber(): void;

    /**
     * Gets whether or not the user has enabled remote notifications
     */
    function isRegisteredForRemoteNotifications(): boolean;

    /**
     * Registers the app with APNS. Only neccesary if APNS.RegisterOnLaunch was
     * set to false in the unoproj file.
     */
    function register(): void;
}

/**
 * This module provides easy access to sensors on the device. There are 8 types of sensors supported by this module, namely:
 * * Accelerometer Sensor
 * * Gyroscope sensor
 * * Magnetometer sensor
 * * Gravity Sensor
 * * User Acceleration Sensor
 * * Rotation sensor
 * * Step Counter Sensor
 * * Pressure sensor
 *
 * Besides being able to read sensor data, this module can also monitor changes in state of the battery and network connectivity
 *
 * Use [startListening](api:fuse/sensor/sensormodule/startlistening_bbef95e2.json) to get continual sensor data updates.
 *  And use [stopListening](api:fuse/sensor/sensormodule/stoplistening_bbef95e2.json) to stop getting continual sensor data updates.
 *
 * You need to add a reference to `"Fuse.Sensor"` in your project file to use this feature.
 *
 * This module is an @EventEmitter, so the methods from @EventEmitter can be used to listen to events.
 *
 * > Please note that this module will not work on Desktop Preview. When running on the device, not all devices have a complete sensor hardware,
 * >  so not all sensor output data can be obtained, it all depends on the availability of sensors on the device.
 * >  Make sure to check "error" event for possible error that encounter.
 *
 * ## Example
 *
 * The following example shows how to access accelerometer sensor:
 * ```xml
 *     <JavaScript>
 *         var Observable = require("FuseJS/Observable");
 *         var Sensor = require("FuseJS/Sensor");
 *         var accelerometerData = Observable("")
 *         var errorMessage = Observable("")
 *
 *         Sensor.on("error", function(failMessage) {
 *             errorMessage.value = failMessage;
 *         });
 *
 *         Sensor.on("changed", function(data) {
 *             if (data.type == Sensor.ACCELEROMETER) {
 *                 accelerometerData.value = "X axis : " + data.x + " Y axis : " + data.y + " Z axis : " + data.z;
 *             }
 *         });
 *
 *         function startAccelerometerContinuousListener() {
 *             Sensor.startListening(Sensor.ACCELEROMETER);
 *         }
 *
 *         function stopAccelerometerContinuousListener() {
 *             Sensor.stopListening(Sensor.ACCELEROMETER);
 *         }
 *
 *         module.exports = {
 *             startAccelerometerContinuousListener,
 *             stopAccelerometerContinuousListener,
 *             accelerometerData,
 *             errorMessage
 *         };
 *     </JavaScript>
 *
 *     <StackPanel ItemSpacing="5" Margin="0,30,0,0">
 *         <Text>Accelerometer data :</Text>
 *         <Text Value="{accelerometerData}" />
 *         <Text Value="{errorMessage}" Color="Red" />
 *
 *         <Button Text="Start continuous Accelerometer listener" Clicked="{startAccelerometerContinuousListener}" />
 *         <Button Text="Stop continuous Accelerometer listener" Clicked="{stopAccelerometerContinuousListener}" />
 *     </StackPanel>
 * ```
 * In the above example we're using `"changed"` event. Data returned by this module are JavaScript objects of the following form:
 * ```json
 *     {
 *         type: sensor type (in this case is Sensor.ACCELEROMETER),
 *         x: value of x axis,
 *         y: value of y axis,
 *         z: value of z axis,
 *     }
 * ```
 * ## Output
 *
 * Data returned on the "changed" event argument are JavaScript objects with always have `type` property.
 *  Value of `type` property determine what type sensor data it contains.
 *
 * Accelerometer, Gyroscope, Magnetometer, Gravity, User Acceleration and Rotation data all have same form of JavaScript object as desribed in the example below:
 * ```js
 *     var Sensor = require("FuseJS/Sensor")
 *     Sensor.on('changed', function(data) {
 *         switch (data.type) {
 *             case Sensor.ACCELEROMETER:
 *                 console.log("X axis : " + data.x + " Y axis : " + data.y + " Z axis : " + data.z);
 *                 break;
 *             case Sensor.GYROSCOPE:
 *                 console.log("X axis : " + data.x + " Y axis : " + data.y + " Z axis : " + data.z);
 *                 break;
 *             case Sensor.MAGNETOMETER:
 *                 console.log("X axis : " + data.x + " Y axis : " + data.y + " Z axis : " + data.z);
 *                 break;
 *             case Sensor.GRAVITY:
 *                 console.log("X axis : " + data.x + " Y axis : " + data.y + " Z axis : " + data.z);
 *                 break;
 *             case Sensor.USER_ACCELERATION:
 *                 console.log("X axis : " + data.x + " Y axis : " + data.y + " Z axis : " + data.z);
 *                 break;
 *             case Sensor.ROTATION:
 *                 console.log("X axis : " + data.x + " Y axis : " + data.y + " Z axis : " + data.z);
 *                 break;
 *         }
 *     });
 *
 *     function startListeningSensor() {
 *         Sensor.startListening(Sensor.ACCELEROMETER);
 *         Sensor.startListening(Sensor.GYROSCOPE);
 *         Sensor.startListening(Sensor.MAGNETOMETER);
 *         Sensor.startListening(Sensor.GRAVITY);
 *         Sensor.startListening(Sensor.USER_ACCELERATION);
 *         Sensor.startListening(Sensor.ROTATION);
 *     }
 *
 *     function stopListeningSensor() {
 *         Sensor.stopListening(Sensor.ACCELEROMETER);
 *         Sensor.stopListening(Sensor.GYROSCOPE);
 *         Sensor.stopListening(Sensor.MAGNETOMETER);
 *         Sensor.stopListening(Sensor.GRAVITY);
 *         Sensor.stopListening(Sensor.USER_ACCELERATION);
 *         Sensor.stopListening(Sensor.ROTATION);
 *     }
 * ```
 * Step counter and pressure data has slightly different output JavaScript object as described in the example below:
 * ```js
 *     var Sensor = require("FuseJS/Sensor")
 *     Sensor.on('changed', function(data) {
 *         switch (data.type) {
 *             case Sensor.STEP_COUNTER:
 *                 console.log("Num Steps taken : " + data.x);
 *                 break;
 *             case Sensor.PRESSURE:
 *                 console.log("Pressure in hPa / mbar : " + data.x);
 *                 console.log("Relative Altitude (iOS only) in meters : " + data.y);
 *                 break;
 *         }
 *     });
 *
 *     function startListeningSensor() {
 *         Sensor.startListening(Sensor.STEP_COUNTER);
 *         Sensor.startListening(Sensor.PRESSURE);
 *     }
 *
 *     function stopListeningSensor() {
 *         Sensor.stopListening(Sensor.STEP_COUNTER);
 *         Sensor.stopListening(Sensor.PRESSURE);
 *     }
 * ```
 * Lastly, monitoring state changes of battery or network connectivity has output JavaScript object as follow:
 * ```js
 *     var Sensor = require("FuseJS/Sensor")
 *     Sensor.on('changed', function(data) {
 *         switch (data.type) {
 *             case Sensor.BATTERY:
 *                 console.log("Battery level : " + data.level);
 *                 console.log("Battery state : " + data.state); // possible values : charging, unplug, full, not charging, unknown
 *                 break;
 *             case Sensor.CONNECTION_STATE:
 *                 console.log("connection state : " + data.state); // boolan value : true connected, false disconnected
 *                 console.log("connection state string : " + data.stateString); // possible values : 'connected' or 'disconnected'
 *                 break;
 *         }
 *     });
 *
 *     function startMonitoringState() {
 *         Sensor.startListening(Sensor.BATTERY);
 *         Sensor.startListening(Sensor.CONNECTION_STATE);
 *     }
 *
 *     function stopMonitoringState() {
 *         Sensor.stopListening(Sensor.BATTERY);
 *         Sensor.stopListening(Sensor.CONNECTION_STATE);
 *     }
 * ```
 * To handle errors from Sensor we can listen to the `"error"` event, as follows:
 * ```js
 *     var Sensor = require("FuseJS/Sensor")
 *     Sensor.on("error", function(err) { ... })
 * ```
 */
declare module "FuseJS/Sensor" {
    const ACCELEROMETER: number;
    const GYROSCOPE: number;
    const MAGNETOMETER: number;
    const GRAVITY: number;
    const USER_ACCELERATION: number;
    const ROTATION: number;
    const STEP_COUNTER: number;
    const PRESSURE: number;
    const BATTERY: number;

    /**
     * track network connectivity states.
     */
    const CONNECTION_STATE: number;

    type Event = "changed(location)" |
                 "error(error)";

    /**
     * Registers a function to be called when one of the following events occur.
     *
     * * `"changed(location)"` - Raised when the sensor changes.
     * * `"error(error)"` - Raised when an error occurs.
     */
    function on(event: Event, callback: (arg: any) => void): void;

    /**
     * check whether sensor module is sensing for particular sensor.
     */
    function isSensing(sensorType: number): boolean;

    /**
     * Starts the Sensor listening service.
     *
     * [onChanged](api:fuse/sensor/sensormodule/datachanged_a09c80e3.json)
     * events will be generated as the sensor changes.
     *
     * Use [stopListening](api:fuse/sensor/sensormodule/stoplistening_bbef95e2.json) to stop the service.
     */
    function startListening(sensorType: number): void;

    /**
     * Stops the Sensor listening service.
     */
    function stopListening(sensorType: number): void;
}

/**
 * Cross-app content sharing API for mobile targets.
 * Supports sharing of raw text, and files with associated [mimetype](http://www.iana.org/assignments/media-types/media-types.xhtml).
 *
 * Uses Action Sheet on iOS and ACTION_SEND Intents on Android.
 *
 * NB: on iPad, iOS design guidelines requires a point on screen as the origin for the share popover. You can do this by passing a reference to a UX element.
 *
 * You need to add a reference to "Fuse.Share" in your project file to use this feature.
 *
 * ## Example
 * ```xml
 *     <JavaScript>
 *         var Share = require("FuseJS/Share")
 *         var Camera = require("FuseJS/Camera")
 *         module.exports = {
 *             shareFile : function()
 *             {
 *                 Camera.takePicture(320,240)
 *                 .then(function(image) {
 *                     Share.shareFile(image.path, "image/*", "Photo from Fuse");
 *                 });
 *             },
 *             shareText : function()
 *             {
 *                 Share.shareText("https://fuseopen.com/", "The link to Fuse Open website");
 *             }
 *         }
 *     </JavaScript>
 * ```
 * ## iPad example
 * ```xml
 *     <Panel>
 *         <Button Text="Share" Clicked="{shareText}"/>
 *         <Panel ux:Name="ShareOrigin" Alignment="Center" Width="1" Height="1" />
 *         <JavaScript>
 *             var Share = require("FuseJS/Share")
 *             module.exports = {
 *                 shareText : function()
 *                 {
 *                     // The iOS popover will use the position of ShareOrigin as its spawn origin
 *                     Share.shareText("https://fuseopen.com/", "The link to Fuse Open website", ShareOrigin);
 *                 }
 *             }
 *         </JavaScript>
 *     </Panel>
 * ```
 */
declare module "FuseJS/Share" {
    /**
     * Share a file to another application by path.
     */
    function shareFile(path: string, mimetype: string, description: string): void;

    /**
     * Share raw text to another application.
     */
    function shareText(text: string, description: string): void;
}

/**
 * The storage API allows you to read from and write to files in the application directory.
 * ```js
 *     var Storage = require("FuseJS/Storage");
 * ```
 * Check out the individual functions for documentation on how to use them.
 */
declare module "FuseJS/Storage" {
    /**
     * Synchrounously reads data from a file inside the application folder.
     *
     * ```js
     *     var Storage = require("FuseJS/Storage");
     *
     *     var contents = Storage.readSync("myfile.txt");
     *     console.log(contents);
     * ```
     *
     * > Warning: This call will block until the operation is finished. Use read() if you are reading large amounts of data.
     */
    function readSync(filename: string): string;

    /**
     * Asynchronously reads a file and returns a promise of its contents.
     *
     * ```js
     *     var Storage = require("FuseJS/Storage");
     *
     *     Storage.read("myfile.txt")
     *         .then(function(contents) {
     *             console.log(contents);
     *         }, function(error) {
     *             console.log(error);
     *         });
     * ```
     */
    function read(filename: string): Promise<string>;

    /**
     * Synchrounously deletes a file inside the application folder.
     *
     * ```js
     *     var Storage = require("FuseJS/Storage");
     *
     *     var success = Storage.removeSync("uselessFile.txt");
     *     if(success) {
     *         console.log("Deleted file");
     *     }
     *     else {
     *         console.log("An error occured!");
     *     }
     * ```
     *
     * > Warning: This call will block until the operation is finished.
     */
    function removeSync(filename: string): boolean;

    /**
     * Synchrounously writes data to a file inside the application folder.
     *
     * ```js
     *     var Storage = require("FuseJS/Storage");
     *
     *     var success = Storage.writeSync("myfile.txt", "Hello from Fuse!");
     *     if(success) {
     *         console.log("Successfully wrote to file");
     *     }
     *     else {
     *         console.log("An error occured!");
     *     }
     * ```
     *
     * > Warning: This call will block until the operation is finished. Use write() if you are writing large amounts of data.
     */
    function writeSync(filename: string, contents: string): boolean;

    /**
     * Asynchronously writes to a file.
     *
     * ```js
     *     var Storage = require("FuseJS/Storage");
     *
     *     Storage.write("myfile.txt", "Hello from Fuse!")
     *         .then(function(succeeded) {
     *             if(succeeded) {
     *                 console.log("Successfully wrote to file");
     *             }
     *             else {
     *                 console.log("Couldn't write to file.");
     *             }
     *         });
     * ```
     */
    function write(filename: string, contents: string): Promise<boolean>;
}

/**
 * `FuseJS/UserSettings` module provides key-value pairs mechanism to store and retrieve primitive data types (string, number, boolean) as well as an array and json object.
 * You can use this module to store information such as configuration data, application states etc.
 *
 * > `UserSettings` module is implemented atop NSUserDefaults on iOS and Shared Preferences on Android
 *
 * ## Example
 * ```xml
 *     <JavaScript>
 *         var userSettings = require("FuseJS/UserSettings")
 *
 *         userSettings.putString('email', 'john.appleseed@example.com');
 *         userSettings.putString('password', 's3c1ReT');
 *         userSettings.putString('api_token', '73awnljqurelcvxiy832a');
 *         userSettings.putBoolean('logged', true);
 *         userSettings.putNumber('state_num', 2);
 *         userSettings.putArray('preferences', ['Technology', 'Cars', 'Foods']);
 *         userSettings.putObject('profile', {
 *             'first_name': 'John',
 *             'last_name': 'Appleseed',
 *             'gender': 'male',
 *             'address': '5 avenue'
 *             'age': 25,
 *             'married': false
 *         });
 *
 *         var email = userSettings.getString('email');
 *         var password = userSettings.getString('password');
 *         var api_token = userSettings.getString('api_token');
 *         var logged = userSettings.getBoolean('logged');
 *         var state_num = userSettings.getNumber('state_num');
 *         var preferences = userSettings.getArray('preferences');
 *         var profile = userSettings.getObject('profile');
 *     </JavaScript>
 * ```
 */
declare module "FuseJS/UserSettings" {
    /**
     * clear User Setting values
     */
    function clear(): void;

    /**
     * Retrieve a Boolean value from the UserSetting.
     */
    function getBoolean(key: string): boolean;

    /**
     * Retrieve a Number value from the UserSetting.
     */
    function getNumber(key: string): number;

    /**
     * Retrieve a Json Object value from the UserSetting.
     */
    function getObject(key: string): any;

    /**
     * Retrieve a String value from the UserSetting.
     */
    function getString(key: string): string;

    /**
     * Set a Boolean value in the UserSetting.
     */
    function putBoolean(key: string, value: boolean): void;

    /**
     * Set a Number value in the UserSetting.
     */
    function putNumber(key: string, value: number): void;

    /**
     * Set a JSON value in the UserSetting.
     */
    function putObject(key: string, value: any): void;

    /**
     * Set a String value in the UserSetting.
     */
    function putString(key: string, value: string): void;

    /**
     * remove value based on key.
     */
    function remove(key: string): void;

}

/**
 * Allows you to use the device's vibration functionality.
 *
 * You need to add a reference to `"Fuse.Vibration"` in your project file to use this feature.
 *
 * ## Example
 *
 * The following code vibrates the device for 0.8 seconds.
 * ```js
 *     var vibration = require('FuseJS/Vibration');
 *     vibration.vibrate(0.8);
 *     // works on iOS using TapticEngine
 *     vibration.vibrate('medium');
 * ```
 */
declare module "FuseJS/Vibration" {
    /**
     * vibrationType (string) the type of vibration (works only on iOS using TapticEngine). Available vibrationType are : `soft`, `rigid`, `light`, `medium`, `heavy`, `success`, `warning`, `error`, `selection`
     */
    function vibrate(seconds: number | string): void;
}

/**
 * Utility methods for video files manipulation. Currently only supports moving a video file to the camera roll.
 *
 * > To use this module, add `Fuse.Controls.CameraView` to your package references in your `.unoproj`.
 *
 * ## Example
 * ```xml
 *     <JavaScript>
 *         var VideoTools = require("FuseJS/VideoTools");
 *
 *         VideoTools.copyVideoToCameraRoll(somePath);
 *     </JavaScript>
 * ```
 */
declare module "FuseJS/VideoTools" {
    /**
     * Copy a video to the camera roll.
     */
    function copyVideoToCameraRoll(videoPath: string): void;
}

/**
 * This module provides access to whether or not the current OS setting for Dark Mode is enabled and or changed.
 *
 * ## Example
 *
 * ```xml
 * <App>
 *     <JavaScript>
 *
 *         var DarkMode = require("FuseJS/DarkMode");
 *         var Observable = require("FuseJS/Observable");
 *
 *         var isDarkMode = Observable(false);
 *
 *         DarkMode.on("changed", function(val) {
 *             console.log("DARKMODE CHANGED: " + val);
 *             switch(val) {
 *                 case 'light': isDarkMode.value = false;
 *                     break;
 *                 case 'dark': isDarkMode.value = true;
 *                     break;
 *             }
 *         });
 *
 *         module.exports = {
 *             isDarkMode
 *         }
 *
 *     </JavaScript>
 *     <StackPanel Alignment="Center">
 *         <Text ux:Name="title" Value="Hello World!" />
 *     </StackPanel>
 *     <Rectangle ux:Name="bk" Layer="Background" Color="#FFF" />
 *
 *     <WhileTrue Value="{isDarkMode}">
 *         <Change title.Value="Hello Dark World!" />
 *         <Change title.Color="#FFF" />
 *         <Change bk.Color="#000" />
 *     </WhileTrue>
 *     <WhileFalse Value="{isDarkMode}">
 *         <Change title.Value="Hello World!" />
 *         <Change title.Color="#000" />
 *         <Change bk.Color="#FFF" />
 *     </WhileFalse>
 * </App>
 * ```
 */
declare module "FuseJS/DarkMode" {
}

/**
 * Launches the default email app, and starts composing a message.
 *
 * You need to add a reference to `"Fuse.Launcher"` in your project file to use this feature.
 * ```js
 *     var email = require('FuseJS/Email');
 *     email.compose("to@example.com", "cc@example.com", "bcc@example.com", "subject", "message");
 * ```
 */
declare module "FuseJS/Email" {
    /**
     * Launches the default email app, and starts composing a message.
     *
     * compose accepts the following arguments:
     *
     * to – The email address(es) of the recipient
     * cc – The email address(es) of whom to send a carbon copy
     * bcc – The email address(es) of whom to send a blind carbon copy
     * subject – The subject of the email
     * message – The body text of the email
     * ```js
     *     var email = require('FuseJS/Email');
     *     email.compose("to@example.com", "cc@example.com", "bcc@example.com", "subject", "message");
     * ```
     */
    function compose(to: string, cc: string, bcc: string, subject: string, message: string): void;
}

/**
 * The InterApp API allows you to launch other apps, as well as respond to being launched via URI schemes.
 *
 * This module is an @EventEmitter, so the methods from @EventEmitter can be used to listen to events.
 *
 * You need to add a reference to `"Fuse.Launcher"` in your project file to use this feature.
 *
 * ## Example
 * ```javascript
 *     var InterApp = require("FuseJS/InterApp");
 *
 *     InterApp.on("receivedUri", function(uri) {
 *         console.log("Launched with URI", uri);
 *     });
 *
 *     InterApp.launchUri("https://fuseopen.com/");
 * ```
 *
 * In the above example we're using the @EventEmitter `on` method to listen to the `"receivedUri"` event.
 *
 * For the [receivedUri](api:fuse/reactive/fusejs/interapp/onreceiveduri_968f99a6.json) event to be triggered, you need register a custom URI scheme for your app, as shown [here](articles:basics/uno-projects#mobile-urischeme).
 *
 * ## Deep Links - Universal and App Links
 *
 * You can receive the `receivedUri` event, mentioned above, for associated web urls that have been tapped on in other apps.
 *
 * Apple: [https://developer.apple.com/ios/universal-links](https://developer.apple.com/ios/universal-links)
 *
 * Android: [https://developer.android.com/training/app-links](https://developer.android.com/training/app-links)
 *
 * ## Apple Universal Links
 *
 * 1. Add the associated domains in your `.unoproj`
 * 2. Add the Apple App Site Association file to your website
 *
 * ### 1. Add associated domains to your .unoproj
 *
 * ```JSON
 * {
 *     "iOS": {
 *         "SystemCapabilities": {
 *             "AssociatedDomains": ["applinks:example.com", "applinks:sub.example.com"]
 *         }
 *     }
 * }
 * ```
 *
 * ### 2. Add the Apple App Site Association file to your website
 *
 * Apple-app-site-association file format
 * ```JSON
 * {
 *     "applinks": {
 *         "apps": [],
 *         "details": [
 *             {
 *                 "appID": "<team identifier>.<bundle identifier>",
 *                 "paths": [<paths>]
 *             }
 *         ]
 *     }
 * }
 * ```
 *
 * Basic example, this allows all urls of the domain to be validated:
 * ```JSON
 * {
 *     "applinks": {
 *         "apps": [],
 *         "details": [
 *             {
 *                 "appID": "1234567890.com.mypackage.myapp",
 *                 "paths": ["*"]
 *             }
 *         ]
 *     }
 * }
 * ```
 *
 * Place this file either in your site’s `.well-known` directory, or directly in its root directory. If you use the `.well-known` directory, the file’s URL should match the following format:
 * ```
 * https://<fully qualified domain>/.well-known/apple-app-site-association
 * ```
 * Tip: make sure you can access the file and view the JSON of the apple-app-site-association file from a browser.
 *
 * Full reference: [https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links?language=objc](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/enabling_universal_links?language=objc)
 *
 * ## Android App Links
 *
 * 1. Add the associated domains in your `.unoproj`
 * 2. Add the asset links file to your website
 *
 * ### 1. Add associated domains to your .unoproj
 *
 * ```JSON
 * {
 *     "Android": {
 *         "AssociatedDomains": ["example.com", "sub.example.com"]
 *     }
 * }
 * ```
 *
 * ### 2. Add the asset links file to your website
 *
 * Example:
 * ```json
 * [{
 *   "relation": ["delegate_permission/common.handle_all_urls"],
 *     "target": {
 *       "namespace": "android_app",
 *       "package_name": "com.example.puppies.app",
 *       "sha256_cert_fingerprints":
 *       ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
 *     }
 *   },
 *   {
 *     "relation": ["delegate_permission/common.handle_all_urls"],
 *     "target": {
 *       "namespace": "android_app",
 *       "package_name": "com.example.monkeys.app",
 *       "sha256_cert_fingerprints":
 *       ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
 *     }
 * }]
 * ```
 *
 * Each group represents an app, you will likely need one for your development version and one for your release version of your app.
 *
 * To get the `sha256_cert_fingerprints`, use the following:
 * ```
 * keytool -list -v -keystore my-release-key.keystore
 * ```
 *
 * To get the sha256 for the development version of exporting with fuse, use with `android` as the password:
 * `keytool -list -v -keystore ~/.android/debug.keystore`
 *
 * Place this file in your site’s `.well-known` directory. The file’s URL should match the following format:
 * ```
 * https://domain.name/.well-known/assetlinks.json
 * ```
 */
declare module "FuseJS/InterApp" {
    type Event = "receivedUri";

    /**
     * Registers a function to be called when one of the following events occur.
     *
     * * `"receivedUri"` - Called when the app is launched via its own URI scheme.
     */
    function on(event: Event, callback: () => void): void;

    /**
     * Requests the system to launch an app.
     *
     * Note: for iOS you must use a uri
     * for android, an applicationid like: https://play.google.com/store/apps/details?id=[application id]
     *
     * There are several common URI schemes that you can use on iOS:
     *     http://<website address>
     *     https://<website address>
     *     tel:<phone number>
     *     sms:<phone number>
     *
     * More information on supported URI schemes on iOS(https://developer.apple.com/library/content/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html).
     */
    function launchApp(uri: string): void;

    /**
     * Requests the system to launch an app that handles the specified URI.
     *
     * Note: you can pass any URI string to `launchUri`, but how it is handled will depend on the target platform and particular device settings.
     *
     * There are several common URI schemes that you can use on both Android and iOS:
     *     http://<website address>
     *     https://<website address>
     *     tel:<phone number>
     *     sms:<phone number>
     *
     * Other platform-specific URI schemes are known to be working fine, for example `geo:<parameters>` launches Maps application on Android
     * and `facetime:<parameters>` launches a Facetime video call on iOS.
     * More information on supported URI schemes: [on Android](https://developer.android.com/guide/components/intents-common.html) and [on iOS](https://developer.apple.com/library/content/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html).
     */
    function launchUri(uri: string): void;
}

/**
 * Lanches the map application using the provided `latitude`/`longitude` pair and/or `query`.
 *
 * You need to add a reference to `Fuse.Launcher` in your project file to use this feature.
 *
 * ## Example
 *
 * This code will launch a map centered at the nearest pizza restaurant.
 * ```js
 *     var Maps = require("FuseJS/Maps");
 *     Maps.searchNear(59.9117715, 10.7400957, "pizza restaurant");
 * ```
 */
declare module "FuseJS/Maps" {
    /**
     * Launches the map application, centered at the location given by `latitude` and `longitude`.
     *
     * ## Example
     * ```js
     *     var Maps = require("FuseJS/Maps");
     *     Maps.openAt(59.9117715, 10.7400957);
     * ```
     */
    function openAt(latitude: number, longitude: number): void;

    /**
     * Launches the map application, centered at the location found nearby the given `latitude` and `longitude`,
     * using `query` as search criteria.
     *
     * ## Example
     * ```js
     *     var Maps = require("FuseJS/Maps");
     *     Maps.searchNear(59.9117715, 10.7400957, "Fusetools");
     * ```
     */
    function searchNear(latitude: number, longitude: number, query: string): void;

    /**
     * Launches the map application, centered at the location found using `query` as search criteria.
     *
     * ## Example
     * ```js
     *     var Maps = require("FuseJS/Maps");
     *     Maps.searchNearby("Fusetools");
     * ```
     */
    function searchNearby(query: string): void;
}

/**
 * The Phone API allows you to launch your device's built-in
 * phone app and make calls or send messages.
 *
 * You need to add a reference to `"Fuse.Launcher"` in your project file to use this feature.
 *
 * ## Example
 * ```js
 *     var phone = require("FuseJS/Phone");
 *     phone.call("+47 123 45 678");
 *     phone.sms("+47 123 45 678", "Hi there");
 * ```
 */
declare module "FuseJS/Phone" {
    /**
     * Launches your device's phone app with the specified number.
     *
     * ## Example
     * ```js
     *     var phone = require("FuseJS/Phone");
     *     phone.call("+47 123 45 678");
     * ```
     */
    function call(number: string): void;

    /**
     * Launches your device's messages app with the specified number.
     *
     * ## Example
     * ```js
     *     var phone = require("FuseJS/Phone");
     *     phone.sms("+47 123 45 678", "Hi there");
     * ```
     */
    function sms(number: string, body: string): void;

}

/**
 * The Timer API lets you schedule functions to be executed after a given time.
 * ```js
 *     var Timer = require("FuseJS/Timer");
 *
 *     Timer.create(function() {
 *         console.log("This will run once, after 3 seconds");
 *     }, 3000, false);
 *
 *     Timer.create(function() {
 *         console.log("This will run every 10 seconds until forever");
 *     }, 10000, true);
 * ```
 */
declare module "FuseJS/Timer" {
    interface TimerId {}

    /**
     * Schedules `func` to be called after `time` milliseconds.
     * ```js
     *     var Timer = require("FuseJS/Timer");
     *     Timer.create(function() {
     *         console.log("This will run once, after 3 seconds");
     *     }, 3000, false);
     *
     *     Timer.create(function() {
     *         console.log("This will run every 10 seconds until forever");
     *     }, 10000, true);
     * ```
     */
    function create(func: () => void, time: number, repeat: boolean): TimerId;

    /**
     * Deletes/unschedules a running timer.
     *
     * ```js
     * var Timer = require("FuseJS/Timer");
     *
     * var callCount = 0;
     *
     * var timerId = Timer.create(function() {
     *     console.log("This will happen 3 times.");
     *
     *     callCount++;
     *     if(callCount >= 3) {
     *         Timer.destroy(timerId);
     *     }
     * }, 2000, true);
     * ```
     */
    function destroy(timerId: TimerId): void;
}

/**
 * Offers simple alert and yes/no dialogs on mobile platforms.
 */
declare module "FuseJS/Alerts" {
    /**
     * Displays an alert box with a single button.
     */
    function alert(title: string, description: string, okbuttonlabel: string): void;

    /**
     * Displays an ok/cancel dialog.
     */
    function confirm(title: string, description: string, okbuttonlabel: string, cancelbuttonlabel: string): boolean;

}

/**
 * This module allows you to shows menu items when pressing App Icon on the device home screen.
 * This feature refer to the [home screen actions](https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/home-screen-actions/) on iOS and [App Shortcut](https://developer.android.com/guide/topics/ui/shortcuts.html) on Android (introduced in Android 7.1 / API Level 25).
 *
 * You need to add a reference to `"Fuse.Shortcut"` in your project file to use this feature.
 *
 * This module is an @EventEmitter, so the methods from @EventEmitter can be used to listen to events.
 *
 * ## Usage
 *
 * The following example shows how create shortcut:
 * ```xml
 *         <App>
 *             <JavaScript>
 *
 *                 var Observable = require("FuseJS/Observable")
 *                 var selectedShortcut = new Observable("-")
 *
 *                 var shortcut = require("FuseJS/Shortcut");
 *                 shortcut.registerShortcuts([
 *                     {
 *                         id: 'compose',
 *                         title: "Compose",
 *                         icon: "assets/images/compose.png"
 *                     },
 *                     {
 *                         id: 'profile',
 *                         title: "Profile",
 *                         icon: "assets/images/user.png"
 *                     },
 *                     {
 *                         id: 'book_store',
 *                         title: "Book Store",
 *                         icon: "assets/images/book.png"
 *                     }
 *                 ])
 *
 *                 shortcut.on('shortcutClicked', (type) => {
 *                     selectedShortcut.value = type;
 *                 })
 *
 *                 module.exports = {
 *                     selectedShortcut
 *                 }
 *
 *             </JavaScript>
 *             <StackPanel Margin="20">
 *                 <Text Value="Selected Shortcut: {selectedShortcut}" />
 *             </StackPanel>
 *         </App>
 *
 * Note that on the `registerShortcuts` method accepts array of json objects with the following properties:
 * * id, id of the shortcut, and will be passed on the `shortcutClicked` callback when particular shortcut get clicked. This property is mandatory
 * * title, to display menu title. This property is mandatory
 * * subtitle, to display sub title (displayed below the title on iOS). This property is optional
 * * icon, to display icon beside the menu title, value of the icon is a local image path (i.e asset path) not a url and must be registered as a Bundle. More info about Bundle [here.](/docs/assets/bundle). This property is optional
 */
declare module "FuseJS/Shortcut" {
}

/**
 * The InAppBrowser API allows you to launch In App Browser
 *
 * You need to add a reference to `"Fuse.Launcher"` in your project file to use this feature.
 *
 * ## Example
 *
 * ```javascript
 *     var inAppBrowser = require("FuseJS/InAppBrowser");
 *     inAppBrowser.openUrl("https://fuseopen.com");
 * ```
 */
declare module "FuseJS/InAppBrowser" {
}

