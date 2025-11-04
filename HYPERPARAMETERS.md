## 1\. Model Development and Training (Python/tinygrad)

| Weight: 35% (Difficulty: High) |
| :--- |

This section focuses on using Python and the **tinygrad** framework to build, train, and optimize your models.

### 1.1 Model Requirements & Training

1.  **MLP (Multi-Layer Perceptron):** Start with the provided `mnist_mlp.py`.
2.  **CNN (Convolutional Neural Network):** Create a new file (e.g., `mnist_convnet.py`) and implement a simple CNN.
3.  **Export:** Both scripts must use the export logic to generate the WebGPU files (`.js` and `.safetensors`).

**Key Commands for Training & Export:**

To train and export your MLP model for 100 steps with JIT enabled:

```bash
STEPS=100 JIT=1 python mnist_mlp.py
```

*Note: This will create a directory named `mnist_mlp/` containing the exported files.*

### 1.2 Hyperparameter Exploration & Accuracy

  * **Documentation:** Create a markdown file named **`HYPERPARAMETERS.md`**. Log the configurations you tried (e.g., Learning Rate, batch size `BS`, number of layers, optimizer, activation function, ...etc) and the resulting test accuracy.
  * **Experimentation:** Test at least **eight** distinct configurations for *each model* (bonus if you script this exploration).
  * **Accuracy Target:** Aim for the highest possible accuracy (Target: **$\ge 95\%$** for MLP; **$\ge 98\%$** for CNN).

| Grading Scale (0-20) | Description |
| :--- | :--- |
| **0** | No models are implemented or exported. |
| **10 (Minimum)** | Two models are implemented and trained. Minimal documentation (only 1-2 attempts logged). Low accuracy ($\le 90\%$). |
| **15 (Good)** | Two models are implemented, documented exploration for both models (**3 settings each**), and final models meet the target accuracy ($\ge 95\%$/$\ge 98\%$). |
| **20 (Very Good)** | Meets "Good" criteria. The `HYPERPARAMETERS.md` shows exceptional analysis of why certain parameters work best (e.g., analyzing convergence speed or loss stability). |



# MLP



# CNN