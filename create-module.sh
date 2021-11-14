#!/bin/bash

echo "start"

lowercaseTemplate="template"
uppercaseTemplate="Template"
lowercaseFilename=$1
uppercaseFilename=${lowercaseFilename^}

startPath="./src/$lowercaseFilename"

cp -r "./src/template" ${startPath}

loopDir() {
  path=$1
  echo ${path}
  for file in ${path}/* ; do
    echo ${file}
    if [[ -f ${file} ]]; then
      sed -i "s/$lowercaseTemplate/$lowercaseFilename/g" ${file}
      sed -i "s/$uppercaseTemplate/$uppercaseFilename/g" ${file}
      rename "s/$lowercaseTemplate/$lowercaseFilename/" ${file}
    elif [[ -d ${file} ]]; then
      loopDir ${file}
      rename "s/$lowercaseTemplate/$lowercaseFilename/" ${file}
    fi
  done
}

loopDir ${startPath}
printf "\nexport class ${uppercaseFilename}FilterOption {};" >> "./src/core/filter/filter.ts"
