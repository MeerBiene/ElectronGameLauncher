# StaxxGameLauncher


Overview
========
You can use this project as template, put your files in the **public/** directory, and change settings in **launcher.json**
For exemple you have the [ElectronSnok](https://github.com/Adi-df/ElectronSnok) repo who is an adaptation of [Snok](https://github.com/Adi-df/Snok).
Use ```npm run start``` to start the app.
And use ```npm run build``` to build the app.

Configuration
-------------
* ```WINDOW_SETTINGS``` **Object** The window settings...
  * ```WINDOW_TITLE``` **String** Don't need precisions...
  * ```RESIZABLE``` **Boolean** Can we resize the window
  * ```FULLSCREEN``` **Boolean** The window need to be fullscreen
  * ```FRAMELESS``` **Boolean** Does the window is a frameless window
  * ```WINDOW_ICON``` **False|String** Set a path to a icon file **Warning**: the icon path is relative to **public/** dir
  * ```WINDOW_SIZE``` **Object** Specifie the window size
    * ```WIDTH``` **Number** The window width
    * ```HEIGHT``` **Number** The window height
* ```MENU_SETTINGS``` **Object** Menu settings, the menu bar will be create only with the specified options
  * ```ITEM_QUIT``` **Boolean** Add quit item in the menu
  * ```ITEM_ABOUT``` **Boolean** Add about item in the menu
  * ```ITEMS_CLIPBOARDS``` **Boolean** Add clipoards items (copy, cut, paste) in the menu
  * ```ITEMS_DEVTOOL``` **Boolean** Add devtool items (Open devtool and Reload) in the menu
* ```ELECTRON_SETTINGS``` **Object** Other settings relative to electron
  * ```NODE_INTEGRATION``` **Boolean** Allow node require and other node functionalities in script
  * ```INDEX_HTML_FILE``` **String** Set a path to the html main file **Warning**: the icon path is relative to **public/** dir
