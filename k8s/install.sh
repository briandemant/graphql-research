#!/usr/bin/env bash
cd $(dirname $0)
kubectl create configmap config-volume --from-file=conf/
kubectl apply -f ./
