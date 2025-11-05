# MNIST CANVA

![App Screenshot](./screenshot.png)

### **[Live Demo on GitHub Pages](https://isdriss.github.io/AICG-Hello_world)**

---

## Overview

This project demonstrates an end-to-end deep learning pipeline using **[tinygrad](https://github.com/tinygrad/tinygrad)** for model training and **WebGPU** for real-time inference directly in the browser.  
It recognizes handwritten digits (0–9) from the **MNIST** dataset, allowing users to draw a digit and instantly see the model’s prediction and probability distribution.

The app runs **entirely client-side**, using `.safetensors` weights exported from TinyGradd.

---

## Features

- Interactive drawing canvas with **Pen, **Eraser**, and **Clear** tools  
- Real-time digit classification
- **probability bar chart** showing model confidence  
- Selectable models

---

## Model Summary

| Model | Architecture | Final Test Accuracy |
| :---- | :------------ | :----------------: |
| **MLP** | 784 → 512 → 512 → 10 (SiLU activations) | 87.02% |
| **MLP v3** | 784 → 512 → 512 → 512 → 10 (SilU, RelU, SilU) | 92.10% |
| **MLP v8** | 784 → 512 → 512 → 512 → 10 (SilU, RelU, SilU) | 95.55% |
| **CNN** | Conv2d(1,32,5) → Conv2d(32,64,3) → Linear(576,10) | 97.58% |
| **CNN v2** | Conv2d(1,32,5) → Conv2d(32,64,3) → Linear(576,10) | 98.20% |

> Models were trained in TinyGrad with JIT acceleration and data augmentation (rotation, scale, translation).

Exploration of the hyperparameters can be found at [**HYPERPARAMETERS**](HYPERPARAMETERS.md)

## Known Issues
- CNN model implementation is broken (or maybe, the model is badly exported)
- The probability barplot does not appear on mobile

---

## ⚙️ Setup / Local Run

for local tests, do the following:

```bash
git https://github.com/ISDriss/AICG-Hello_world.git
cd AICG-Hello_world
python -m http.server