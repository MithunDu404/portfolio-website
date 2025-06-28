import torch
import torch.nn as nn

# Simple Feedforward Neural Network for Classification
class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNet, self).__init__()
        # Define layers
        self.l1 = nn.Linear(input_size, hidden_size)   # First hidden layer
        self.l2 = nn.Linear(hidden_size, hidden_size)  # Second hidden layer
        self.l3 = nn.Linear(hidden_size, num_classes)  # Output layer
        self.relu = nn.ReLU()                          # Activation function

    def forward(self, x):
        # Pass input through the network
        out = self.l1(x)
        out = self.relu(out)
        out = self.l2(out)
        out = self.relu(out)
        out = self.l3(out)
        # No activation or softmax at the end (handled by loss function)
        return out