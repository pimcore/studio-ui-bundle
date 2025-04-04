# Global Configuration

You can add a Global Configuration for all WYSIWYG Editors for all Data Objects and Documents:

```yaml
pimcore_studio_ui:
    wysiwyg:
        defaultEditorConfig:
            dataObject: # replace this with document for Documents
                modules: 
                    toolbar:
                        container:
                          - [{ header: [1, 2, 3, 4, 5, 6, false] }]
```

This only shows the header selection for all Data Objects.
The arrays after `dataObject` are editor specific. Please use the configuration you need for your editor. 