from tkinter import *
from tkinter.ttk import *
from tkinter import filedialog as fd
from PIL import ImageTk, Image

VER = 'v0.2'

# GUI for udown
class udown():
    def __init__(self):
        self.flag = True # flag for terminate thread
        global udown_Logo
        self.saveto = ""

        self.root = Tk()
        self.root.title('Youtube Download Tool - udown')
        self.root.resizable(width=FALSE, height=FALSE)
