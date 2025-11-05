* **Documentation:** Create a markdown file named **`HYPERPARAMETERS.md`**. Log the configurations you tried (e.g., Learning Rate, batch size `BS`, number of layers, optimizer, activation function, ...etc) and the resulting test accuracy.
* **Experimentation:** Test at least **eight** distinct configurations for *each model* (bonus if you script this exploration).
* **Accuracy Target:** Aim for the highest possible accuracy (Target: **$\ge 95\%$** for MLP; **$\ge 98\%$** for CNN).

# MLP

## Attempt 1: default parameters

### Model
| Type | Size / Filters| Activation / Function |
| :--- | :--- | :--- |
| **Linear** | 784 -> 512  | Silu |  
| **Linear** | 512 -> 512  | Silu |  
| **Linear** | 512 -> 10   | Output |

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch size**  | 512 |  
| **Learning Rate** | 0.02 |  
| **Learning Rate Decay** | 0.9 |
| **Steps** | 70 |  
| **Patience**  | 50 |
| **Optimizer** | Muon |
| === | === |
| **Angle** | 15 |
| **Scale** | 0.1 |
| **Shift** | 0.1 |
| **Sampling** | nearest |


### Test Accuracy : 87.02%

___
Purely out of curiosity, Let's add another layer to the Perceptron with a different activation function, so that it makes a activation function "sandwich"

## Attempt 2: bigger perceptron

### Model
| Type | Size / Filters| Activation / Function |
| :--- | :--- | :--- |
| **Linear** | 784 -> 512  | Silu |  
| **Linear** | 512 -> 512  | Relu |
| **Linear** | 512 -> 512  | Silu |  
| **Linear** | 512 -> 10   | Output |

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch size**  | 512 |  
| **Learning Rate** | 0.02 |  
| **Learning Rate Decay** | 0.9 |
| **Steps** | 70 |  
| **Patience**  | 50 |
| **Optimizer** | Muon |
| === | === |
| **Angle** | 15 |
| **Scale** | 0.1 |
| **Shift** | 0.1 |
| **Sampling** | nearest |

### Test Accuracy : 89.41%

___
We actualy saw some improvements due to that.
Since the perceptron has now a larger architecture, We'll give the model more time to converge and allow the model to learn finer patterns in the data.
Therefore we reduce the learning rate, use smaller batch size, increase the patience  
and use more training steps

## Attempt 3: reduce learning rate and batch size, more training

### Model
| Type | Size / Filters| Activation / Function |
| :--- | :--- | :--- |
| **Linear** | 784 -> 512  | Silu |  
| **Linear** | 512 -> 512  | Relu |
| **Linear** | 512 -> 512  | Silu |  
| **Linear** | 512 -> 10   | Output |

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch size**  | 256 |  
| **Learning Rate** | 0.01 |  
| **Learning Rate Decay** | 0.9 |
| **Steps** | 100 |  
| **Patience**  | 80 |
| **Optimizer** | Muon |
| === | === |
| **Angle** | 15 |
| **Scale** | 0.1 |
| **Shift** | 0.1 |
| **Sampling** | nearest |

### Test Accuracy : 92.10%

___
Change the Optimizer to see how it affects the model training

## Attempt 4: change optimizer to Adam

### Model
| Type | Size / Filters| Activation / Function |
| :--- | :--- | :--- |
| **Linear** | 784 -> 512  | Silu |  
| **Linear** | 512 -> 512  | Relu |
| **Linear** | 512 -> 512  | Silu |  
| **Linear** | 512 -> 10   | Output |

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch size**  | 256 |  
| **Learning Rate** | 0.01 |  
| **Learning Rate Decay** | 0.9 |
| **Steps** | 100 |  
| **Patience**  | 80 |
| **Optimizer** | Adam |
| === | === |
| **Angle** | 15 |
| **Scale** | 0.1 |
| **Shift** | 0.1 |
| **Sampling** | nearest |

### Test Accuracy : 85.34%

___
Adam doesn't seem to be adapted for this use case, reverting to Muon.
Since the perceptron is larger and looks into further details into the data,
Let's see how the accuracy is affected when we put more variations into the data:
increase the angle, scale and shift.

## Attempt 5: More variation in training data

### Model
| Type | Size / Filters| Activation / Function |
| :--- | :--- | :--- |
| **Linear** | 784 -> 512  | Silu |  
| **Linear** | 512 -> 512  | Relu |
| **Linear** | 512 -> 512  | Silu |  
| **Linear** | 512 -> 10   | Output |

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch size**  | 256 |  
| **Learning Rate** | 0.01 |  
| **Learning Rate Decay** | 0.9 |
| **Steps** | 100 |  
| **Patience**  | 80 |
| **Optimizer** | Muon |
| === | === |
| **Angle** | 25 |
| **Scale** | 0.15 |
| **Shift** | 0.15 |
| **Sampling** | nearest |

### Test Accuracy : 89.87%

___
surprisingly, this led to a decrease of accuracy compared to attempt 3,
Maybe changing how the varied data is sampled will yield better results ?

## Attempt 6: Change sampling to bilinear

### Model
| Type | Size / Filters| Activation / Function |
| :--- | :--- | :--- |
| **Linear** | 784 -> 512  | Silu |  
| **Linear** | 512 -> 512  | Relu |
| **Linear** | 512 -> 512  | Silu |  
| **Linear** | 512 -> 10   | Output |

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch size**  | 256 |  
| **Learning Rate** | 0.01 |  
| **Learning Rate Decay** | 0.9 |
| **Steps** | 100 |  
| **Patience**  | 80 |
| **Optimizer** | Muon |
| === | === |
| **Angle** | 25 |
| **Scale** | 0.15 |
| **Shift** | 0.15 |
| **Sampling** | bilinear |

### Test Accuracy : 90.11%

___
Changing the sampling did show better results,  
trying again with lower scale and shift values (lack of understanding of these parameters)

## Attempt 7: lower scale & shift values

### Model
| Type | Size / Filters| Activation / Function |
| :--- | :--- | :--- |
| **Linear** | 784 -> 512  | Silu |  
| **Linear** | 512 -> 512  | Relu |
| **Linear** | 512 -> 512  | Silu |  
| **Linear** | 512 -> 10   | Output |

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch size**  | 256 |  
| **Learning Rate** | 0.01 |  
| **Learning Rate Decay** | 0.9 |
| **Steps** | 100 |  
| **Patience**  | 80 |
| **Optimizer** | Muon |
| === | === |
| **Angle** | 25 |
| **Scale** | 0.01 |
| **Shift** | 0.01 |
| **Sampling** | bilinear |

### Test Accuracy : 91.53%

___
Looking back, the Biggest improvement in accurracy has been seen with the increase of training steps (obviously), we are going to increase the training steps again, but not too much to avoid overfitting.

## Attempt 8: More training steps

### Model
| Type | Size / Filters| Activation / Function |
| :--- | :--- | :--- |
| **Linear** | 784 -> 512  | Silu |  
| **Linear** | 512 -> 512  | Relu |
| **Linear** | 512 -> 512  | Silu |  
| **Linear** | 512 -> 10   | Output |

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch size**  | 256 |  
| **Learning Rate** | 0.01 |  
| **Learning Rate Decay** | 0.9 |
| **Steps** | 250 |  
| **Patience**  | 80 |
| **Optimizer** | Muon |
| === | === |
| **Angle** | 25 |
| **Scale** | 0.01 |
| **Shift** | 0.01 |
| **Sampling** | bilinear |

### Test Accuracy : 95.55%

95+% accuracy achieved :D

# CNN

## Attempt 1: default parameters

### Model
| Type | Size / Filters | Activation / Function |
| :--- | :--- | :--- |
| **Conv2d** | 1 → 32, kernel=5 | SiLU |
| **Conv2d** | 32 → 32, kernel=5 | SiLU |
| **BatchNorm2d** | 32 | Normalize + stabilize training |
| **MaxPool2d** | 2×2 | Downsample |
| **Conv2d** | 32 → 64, kernel=3 | SiLU |
| **Conv2d** | 64 → 64, kernel=3 | SiLU |
| **BatchNorm2d** | 64 | Normalize |
| **MaxPool2d** | 2×2 | Downsample |
| **Flatten** | 64×3×3 = 576 → 576 | Reshape to 1D |
| **Linear** | 576 → 10 | Output |

---

### Training
| Parameter | Value |
| :--- | :--- |
| **Batch Size** | 512 |
| **Learning Rate** | 0.02 |
| **Learning Rate Decay** | 0.9 |
| **Steps** | 70 |
| **Patience** | 50 |
| **Optimizer** | Muon |
| **Angle (°)** | ±15 |
| **Scale** | ±0.1 |
| **Shift (X,Y)** | ±0.1 |

### Test Accuracy : 97.58%