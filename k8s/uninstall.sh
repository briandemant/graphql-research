#!/usr/bin/env bash
cd $(dirname $0)
kubectl delete configmap config-volume
kubectl delete apply -f ./
