#!/bin/bash

echo "start"

lowercaseFilename=$1
uppercaseFilename=$2

cp -r "./src/template" "./src/$lowercaseFilename"

for file in ./src/$1/* ; do
  echo $file
  sed -i "s/template/$lowercaseFilename/g" ${file}
  sed -i "s/Template/$uppercaseFilename/g" ${file}

  if [[ $file == "./src/$lowercaseFilename/dto/create-template.dto.ts" ]]; then
    mv $file "./src/$lowercaseFilename/dto/create-$lowercaseFilename.dto.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/dto/update-template.dto.ts" ]]; then
    mv $file "./src/$lowercaseFilename/dto/update-$lowercaseFilename.dto.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/entities/template.entity.ts" ]]; then
    mv $file "./src/$lowercaseFilename/entities/$lowercaseFilename.entity.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/template.controller.ts" ]]; then
    mv $file "./src/$lowercaseFilename/$lowercaseFilename.controller.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/template.module.ts" ]]; then
    mv $file "./src/$lowercaseFilename/$lowercaseFilename.module.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/template.service.ts" ]]; then
    mv $file "./src/$lowercaseFilename/$lowercaseFilename.service.ts"
  fi
done

for file in ./src/$1/*/* ; do
  echo $file
  sed -i "s/template/$lowercaseFilename/g" ${file}
  sed -i "s/Template/$uppercaseFilename/g" ${file}

  if [[ $file == "./src/$lowercaseFilename/dto/create-template.dto.ts" ]]; then
    mv $file "./src/$lowercaseFilename/dto/create-$lowercaseFilename.dto.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/dto/update-template.dto.ts" ]]; then
    mv $file "./src/$lowercaseFilename/dto/update-$lowercaseFilename.dto.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/entities/template.entity.ts" ]]; then
    mv $file "./src/$lowercaseFilename/entities/$lowercaseFilename.entity.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/template.controller.ts" ]]; then
    mv $file "./src/$lowercaseFilename/$lowercaseFilename.controller.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/template.module.ts" ]]; then
    mv $file "./src/$lowercaseFilename/$lowercaseFilename.module.ts"
  fi

  if [[ $file == "./src/$lowercaseFilename/template.service.ts" ]]; then
    mv $file "./src/$lowercaseFilename/$lowercaseFilename.service.ts"
  fi
done

echo "end"
