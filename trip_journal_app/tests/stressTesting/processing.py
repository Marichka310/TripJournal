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

# define a example function
#def rand_string(length, output):
#    """ Generates a random string of numbers, lower- and uppercase chars. """
#    rand_str = ''.join(random.choice(
#                    string.ascii_lowercase
#                    + string.ascii_uppercase
#                    + string.digits)
#               for i in range(length))
#    output.put(rand_str)

# Setup a list of processes that we want to run
with open('script.sh', 'rb') as file:
    script = file.read()
rc = subprocess.call(script, shell=True)
# Run processes
#for p in processes:
#    p.start()

# Exit the completed processes
#for p in processes:
#    p.join()

# Get process results from the output queue
#results = [output.get() for p in processes]

logger.info('finish')