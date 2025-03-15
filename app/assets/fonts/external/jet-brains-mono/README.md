# Installing Webfonts
Follow these simple Steps.

## 1.
Put `jet-brains-mono/` Folder into a Folder called `fonts/`.

## 2.
Put `jet-brains-mono.css` into your `css/` Folder.

## 3. (Optional)
You may adapt the `url('path')` in `jet-brains-mono.css` depends on your Website Filesystem.

## 4.
Import `jet-brains-mono.css` at the top of you main Stylesheet.

```
@import url('jet-brains-mono.css');
```

## 5.
You are now ready to use the following Rules in your CSS to specify each Font Style:
```
font-family: JetBrainsMono-Thin;
font-family: JetBrainsMono-ThinItalic;
font-family: JetBrainsMono-ExtraLight;
font-family: JetBrainsMono-ExtraLightItalic;
font-family: JetBrainsMono-Light;
font-family: JetBrainsMono-LightItalic;
font-family: JetBrainsMono-Regular;
font-family: JetBrainsMono-Italic;
font-family: JetBrainsMono-Medium;
font-family: JetBrainsMono-MediumItalic;
font-family: JetBrainsMono-SemiBold;
font-family: JetBrainsMono-SemiBoldItalic;
font-family: JetBrainsMono-Bold;
font-family: JetBrainsMono-BoldItalic;
font-family: JetBrainsMono-ExtraBold;
font-family: JetBrainsMono-ExtraBoldItalic;
font-family: JetBrainsMono-Variable;
font-family: JetBrainsMono-VariableItalic;

```
## 6. (Optional)
Use `font-variation-settings` rule to controll axes of variable fonts:
wght 400.0

Available axes:
'wght' (range from 100.0 to 800.0

