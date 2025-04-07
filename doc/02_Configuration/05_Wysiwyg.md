# Global Configuration

You can define a global configuration for all WYSIWYG editors used in data objects and documents. Below is an example configuration:

```yaml
pimcore_studio_ui:
    wysiwyg:
        defaultEditorConfig:
            dataObject: # Replace this with 'document' for documents
                modules: 
                    toolbar:
                        container:
                          - [{ header: [1, 2, 3, 4, 5, 6, false] }]
```

### Explanation

This configuration customizes the header selection for all data objects when using the Quill editor.

- **Header Dropdown**: The `header` array defines a dropdown in the toolbar for selecting header levels (`<h1>` to `<h6>`). 
- **Normal Text Option**: The `false` value allows reverting to normal text (no header formatting).
- **Applicability**: Replace `dataObject` with `document` to apply the configuration to documents instead of data objects.

> **Note**: The configuration under `dataObject` is editor-specific. Ensure you adjust it according to the requirements of your editor.