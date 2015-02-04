import multiprocessing as mp
import random
import string
import logging
import subprocess

logging.basicConfig(level = logging.INFO)
logger = logging.getLogger(__name__)

# create a file handler

handler = logging.FileHandler('multiprocessing.log')
handler.setLevel(logging.INFO)

# write logs to the file "multiprocessing.log"
logger.addHandler(handler)

logger.info('Start execution of program')


# Define an output queue
output = mp.Queue()

# opens a list of commands that we want to execute
with open('script.sh', 'rb') as file:
    script = file.read()
rc = subprocess.call(script, shell=True)

logger.info('finish')