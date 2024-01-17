#!/bin/bash

# Array of all target strings
TARGET_STRINGS=(
    "x-template-name-bundle-x"
    "x_template_bundle_x"
    "xTemplateBundlex"
    "xTemplate Bundlex"
    "xtemplate-bundlex"
    "x_template_x"
    "xtemplatex"
    "x Template x"
)


# Check if sufficient arguments are provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <real_name_bundle_format>"
    exit 1
fi

REAL_NAME_BUNDLE="$1"

# Extract different components
NAME=$(echo "$REAL_NAME_BUNDLE" | awk -F"_bundle" '{print $1}')
BUNDLE="bundle$(echo "$REAL_NAME_BUNDLE" | awk -F"_bundle" '{if (NF>1) print "_" $2}')"

# Derived formats
UPPER_CAMEL_NAME=$(echo "$NAME" | sed -r 's/(^|_)([a-z])/\U\2/g')
UPPER_CAMEL_BUNDLE=$(echo "$BUNDLE" | sed -r 's/(^|_)([a-z])/\U\2/g')

SPACE_NAME=$(echo "$NAME" | sed 's/_/ /g')
SPACE_BUNDLE=$(echo "$BUNDLE" | sed 's/_/ /g')
CAPITALIZED_SPACE_NAME=$(echo "$SPACE_NAME" | awk '{ for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2)); }1')

DASH_NAME=$(echo "$NAME" | sed 's/_/-/g')
DASH_BUNDLE=$(echo "$BUNDLE" | sed 's/_/-/g')

# Function to perform the replacements
perform_replacements() {
    local FILE=$1
    sed -i -e "s/x-template-name-bundle-x/$(echo $NAME | sed 's/_/-/g')-bundle/g" "$FILE"
    sed -i -e "s/xTemplateBundlex/${UPPER_CAMEL_NAME}Bundle/g" "$FILE"
    sed -i -e "s/xTemplate Bundlex/${CAPITALIZED_SPACE_NAME} Bundle/g" "$FILE"
    sed -i -e "s/xtemplate-bundlex/${NAME}-bundle/g" "$FILE"
    sed -i -e "s/x_template_bundle_x/${REAL_NAME_BUNDLE}/g" "$FILE"
    sed -i -e "s/x_template_x/${NAME}/g" "$FILE"
    sed -i -e "s/xtemplatex/$(echo $NAME | sed 's/_//g')/g" "$FILE"
    sed -i -e "s/x Template x/${CAPITALIZED_SPACE_NAME}/g" "$FILE"
}


# Check if a file contains any of the target strings
file_contains_target() {
    local FILE=$1
    for target in "${TARGET_STRINGS[@]}"; do
        grep -q "$target" "$FILE" && return 0
    done
    return 1
}

# Find all files in the directory and perform replacements
# Only on files that contain the target strings
find . -type f | while read -r FILE; do
    if file_contains_target "$FILE"; then
        perform_replacements "$FILE"
    fi
done

echo "Replacements done!"
